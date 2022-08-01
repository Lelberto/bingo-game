import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ActionVoteService } from '../actions/action-vote.service';
import { ActionService } from '../actions/action.service';
import { Action } from '../actions/entities/action.entity';
import { ResolveActionPipe } from '../actions/pipes/resolve-ation.pipe';
import { AccessTokenAuthGuard } from '../auth/jwt/guards/access-token-auth.guard';
import { ReqUser } from '../users/decorators/req-user.decorator';
import { User } from '../users/entities/user.entity';

/**
 * Action controller
 * 
 * Path: `/actions`
 */
@Controller('actions')
export class ActionController {

  private readonly actionService: ActionService;
  private readonly actionVoteService: ActionVoteService;

  public constructor(actionService: ActionService, actionVoteService: ActionVoteService) {
    this.actionService = actionService;
    this.actionVoteService = actionVoteService;
  }

  @Get()
  public async find() {
    return {
      actions: await this.actionService.find()
    }
  }

  @Get(':actionId')
  public async findById(@Param('actionId', ResolveActionPipe) action: Action) {
    return {
      action
    }
  }

  @Post(':actionId/upVote')
  @UseGuards(AccessTokenAuthGuard)
  public async upVote(@Param('actionId', ResolveActionPipe) action: Action, @ReqUser() authUser: User) {
    await this.vote(action, authUser, true);
  }

  @Post(':actionId/downVote')
  @UseGuards(AccessTokenAuthGuard)
  public async downVote(@Param('actionId', ResolveActionPipe) action: Action, @ReqUser() authUser: User) {
    await this.vote(action, authUser, false);
  }

  /**
   * Votes for an action
   * 
   * @param action Action
   * @param user User
   * @param value True if upVote, false if downVote
   */
  private async vote(action: Action, user: User, value: boolean) {
    await this.actionVoteService.vote(action, user, value);
  }
}
