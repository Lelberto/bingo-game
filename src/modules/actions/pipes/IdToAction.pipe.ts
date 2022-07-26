import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ActionService } from '../action.service';
import { Action } from '../entities/action.entity';

/**
 * ID to action pipe
 * 
 * Used to transform the `:id` parameter to the corresponding action.
 * 
 * This pipe can be used with `@Param()`.
 */
@Injectable()
export class IdToActionPipe implements PipeTransform<string, Promise<Action>> {
  
  private readonly actionService: ActionService;

  public constructor(actionService: ActionService) {
    this.actionService = actionService;
  }

  public async transform(id: string, metadata: ArgumentMetadata): Promise<Action> {
    if (metadata.type === 'param') {
      return await this.actionService.findById(id);
    }
    throw new Error(`${this.constructor.name} can only be used with @Param()`);
  }
}
