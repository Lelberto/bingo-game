import { Module } from '@nestjs/common';
import { ActionModule } from '../actions/action.module';
import { AuthModule } from '../auth/auth.module';
import { GameModule } from '../games/game.module';
import { UserModule } from '../users/user.module';
import { ActionController } from './action.controller';
import { AuthController } from './auth.controller';
import { GameController } from './game.controller';
import { UserController } from './user.controller';

/**
 * Controllers module
 */
@Module({
  imports: [
    AuthModule,
    UserModule,
    GameModule,
    ActionModule
  ],
  controllers: [
    AuthController,
    UserController,
    GameController,
    ActionController
  ]
})
export class ControllerModule {}
