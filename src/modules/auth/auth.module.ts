import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthConfig } from '../config/auth.config';
import { AuthService } from './auth.service';

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
    })
  ],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
