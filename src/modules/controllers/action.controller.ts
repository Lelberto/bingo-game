import { Controller, Get, Param } from '@nestjs/common';
import { ActionService } from '../actions/action.service';
import { Action } from '../actions/entities/action.entity';
import { IdToActionPipe } from '../actions/pipes/IdToAction.pipe';

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

  @Get(':id')
  public async findById(@Param('id', IdToActionPipe) action: Action) {
    return {
      action
    }
  }
}
