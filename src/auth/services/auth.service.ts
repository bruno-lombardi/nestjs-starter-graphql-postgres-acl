import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from '../../common/services/crypto.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { User } from '../../user/entities/user.entity';
import { IAuthService } from '../interfaces/i-auth-service.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService,
  ) {}

  async signIn(email: string, password: string): Promise<[string, User]> {
    const user = await this.usersService.findUserBy({ where: { email } });
    const passMatch: boolean = await this.cryptoService.compareHash(
      password,
      user.password,
    );
    if (!passMatch) {
      throw new HttpException(
        { error: 'Usuário ou senha incorretos', code: HttpStatus.UNAUTHORIZED },
        HttpStatus.UNAUTHORIZED,
      );
    }
    const payload: JwtPayload = { email: user.email, id: user.id };
    const token = await this.createToken(payload);
    delete user.password;
    return [token, user];
  }

  async createToken(payload: JwtPayload) {
    return await this.jwtService.signAsync(payload);
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    // Logger.log('Payload: ' + JSON.stringify(payload));
    return this.usersService.findUserBy({
      where: { ...payload },
    });
  }
}
