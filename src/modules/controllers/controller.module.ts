import { Module } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { UserController } from './user.controller';

/**
 * Controllers module
 */
@Module({
  imports: [
    UserModule
  ],
  controllers: [
    UserController
  ]
})
export class ControllerModule {}
