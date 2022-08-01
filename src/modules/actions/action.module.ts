import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionVoteService } from './action-vote.service';
import { ActionService } from './action.service';
import { ActionVote } from './entities/action-vote.entity';
import { Action } from './entities/action.entity';

/**
 * Action module
 */
@Module({
  imports: [TypeOrmModule.forFeature([Action, ActionVote])],
  providers: [ActionService, ActionVoteService],
  exports: [ActionService, ActionVoteService]
})
export class ActionModule {}
