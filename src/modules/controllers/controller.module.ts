import { Module } from '@nestjs/common';
import { ActionModule } from '../actions/action.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/user.module';
import { ActionController } from './action.controller';
import { AuthController } from './auth.controller';
import { UserController } from './user.controller';

/**
 * Controllers module
 */
@Module({
  imports: [
    AuthModule,
    UserModule,
    ActionModule
  ],
  controllers: [
    AuthController,
    UserController,
    ActionController
  ]
})
export class ControllerModule {}
