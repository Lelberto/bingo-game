import { Controller, Get, Param } from '@nestjs/common';
import { ActionService } from '../actions/action.service';
import { Action } from '../actions/entities/action.entity';
import { ResolveActionPipe } from '../actions/pipes/resolve-ation.pipe';

/**
 * Action controller
 * 
 * Path: `/actions`
 */
@Controller('actions')
export class ActionController {

  private readonly actionService: ActionService;

  public constructor(actionService: ActionService) {
    this.actionService = actionService;
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
}
