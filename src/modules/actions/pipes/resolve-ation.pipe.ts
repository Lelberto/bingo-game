import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ActionService } from '../action.service';
import { Action } from '../entities/action.entity';

/**
 * Resolve an action by ID
 * 
 * This pipe is used with `@Param('actionId')`.
 */
@Injectable()
export class ResolveActionPipe implements PipeTransform<string, Promise<Action>> {
  
  private readonly actionService: ActionService;

  public constructor(actionService: ActionService) {
    this.actionService = actionService;
  }

  public async transform(actionId: string, metadata: ArgumentMetadata): Promise<Action> {
    if (metadata.type === 'param') {
      return await this.actionService.findById(actionId);
    }
    throw new Error(`${this.constructor.name} can only be used with @Param()`);
  }
}
