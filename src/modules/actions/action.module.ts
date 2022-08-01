import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionService } from './action.service';
import { ActionVote } from './entities/action-vote.entity';
import { Action } from './entities/action.entity';

/**
 * Action module
 */
@Module({
  imports: [TypeOrmModule.forFeature([Action, ActionVote])],
  providers: [ActionService],
  exports: [ActionService]
})
export class ActionModule {}
