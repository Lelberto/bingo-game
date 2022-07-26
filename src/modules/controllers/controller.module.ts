import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/user.module';
import { AuthController } from './auth.controller';
import { UserController } from './user.controller';

/**
 * Controllers module
 */
@Module({
  imports: [
    AuthModule,
    UserModule
  ],
  controllers: [
    AuthController,
    UserController
  ]
})
export class ControllerModule {}
