import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../../user/services/user.service';
import { CommonModule } from '../../common/common.module';
import { ConfigModule } from '../../config/config.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '../../config/services/config.service';
import { PassportModule } from '@nestjs/passport';
import { User } from '../../user/entities/user.entity';
import UserFactory, {
  CreateUserDtoFactory,
} from '../../user/mocks/factories/user.factory';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UserModule } from '../../user/user.module';
import { DatabaseModule } from '../../database/database.module';
import { HttpException } from '@nestjs/common';

import '../../mock-env';
jest.setTimeout(10000);

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CommonModule,
        PassportModule,
        UserModule,
        DatabaseModule,
        JwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            secret: configService.get('APP_KEY'),
            signOptions: { expiresIn: '1d' },
          }),
          inject: [ConfigService],
        }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
      ],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createToken', () => {
    let user: User;

    beforeEach(() => {
      user = UserFactory.build();
    });

    it('should be defined', () => expect(service.createToken).toBeDefined());

    it('should create token with payload', async () => {
      expect.assertions(2);
      const token = await service.createToken({
        email: user.email,
        id: user.id,
      });
      expect(token).toBeTruthy();
      expect(token.includes('.')).toBeTruthy();
    });
  });

  describe('signIn', () => {
    let user: User;
    let password;

    beforeEach(async () => {
      const dto = CreateUserDtoFactory.build();
      password = dto.password;
      user = await userService.createUser(dto);
    });

    it('should be defined', () => expect(service.signIn).toBeDefined());

    it('should sign user if valid email and password', async () => {
      expect.assertions(3);
      const [token, u] = await service.signIn(user.email, password);
      expect(token).toBeTruthy();
      expect(u.email).toEqual(user.email);
      expect(u.id).toEqual(user.id);
    });

    it('should generate a valid payload from token', async () => {
      expect.assertions(2);
      const [token] = await service.signIn(user.email, password);
      const result = await jwtService.verifyAsync<JwtPayload>(token);
      expect(result.email).toEqual(user.email);
      expect(result.id).toEqual(user.id);
    });

    it('should not sign user if invalid email', async () => {
      expect.assertions(1);
      await expect(
        service.signIn('invalidemail@email.com', password),
      ).rejects.toBeInstanceOf(HttpException);
    });

    it('should not sign user if invalid password', async () => {
      expect.assertions(2);
      const [token, u] = await service.signIn(user.email, 'invalidpassword');
      expect(token).toBe(null);
      expect(u).toBe(null);
    });
  });

  describe('validateUser', () => {
    let user: User;

    beforeEach(async () => {
      const dto = CreateUserDtoFactory.build();
      user = await userService.createUser(dto);
    });

    it('should be defined', () => expect(service.validateUser).toBeDefined());

    it('should validate user if valid payload', async () => {
      const validatedUser = await service.validateUser({
        email: user.email,
        id: user.id,
      });
      expect(validatedUser).toEqual(user);
    });

    it('should not validate user if invalid email in payload', async () => {
      await expect(
        service.validateUser({ email: 'invalidemail@email.com', id: user.id }),
      ).rejects.toBeInstanceOf(HttpException);
    });

    it('should not validate user if invalid id', async () => {
      await expect(
        service.validateUser({
          email: user.email,
          id: 'd83bf552-2ae1-4061-8259-46ed2b14d3d2',
        }),
      ).rejects.toBeInstanceOf(HttpException);
    });
  });
});
