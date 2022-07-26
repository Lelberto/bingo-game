import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthConfig } from '../config/auth.config';
import { UserModule } from '../users/user.module';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google/strategies/google.strategy';
import { AccessTokenStrategy } from './jwt/strategies/access-token.strategy';
import { RefreshTokenStrategy } from './jwt/strategies/refresh-token.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => {
        const accessTokenConfig = config.get<AuthConfig>('auth').jwt.accessToken;
        return {
          secret: accessTokenConfig.secretKey,
          signOptions: { expiresIn: accessTokenConfig.expiration }
        }
      },
      inject: [ConfigService]
    }),
    UserModule
  ],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy, GoogleStrategy],
  exports: [AuthService]
})
export class AuthModule {}
