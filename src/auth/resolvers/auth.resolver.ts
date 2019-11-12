import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { SignInDto } from '../dto/sign-in.dto';
import { ValidationPipe, HttpException, HttpStatus } from '@nestjs/common';
import { User as UserGQL } from '../../graphql';
import { plainToClass } from 'class-transformer';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation()
  async signIn(@Args('signInInput', ValidationPipe)
  {
    email,
    password,
  }: SignInDto) {
    const [token, u] = await this.authService.signIn(email, password);
    if (!token) {
      throw new HttpException(
        { error: 'Usuário ou senha incorretos', code: HttpStatus.UNAUTHORIZED },
        HttpStatus.UNAUTHORIZED,
      );
    }
    const user = plainToClass(UserGQL, u);
    user.token = token;
    return user;
  }
}
