import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/services/config.service';
import { CommonModule } from '../common/common.module';
import { JwtStrategy } from './services/jwt.strategy';
import { GqlAuthGuard } from './services/gql-auth-guard.service';
import { AuthResolver } from './resolvers/auth.resolver';

@Module({
  imports: [
    UserModule,
    PassportModule,
    CommonModule,
    ConfigModule,
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
  providers: [AuthService, JwtStrategy, GqlAuthGuard, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
