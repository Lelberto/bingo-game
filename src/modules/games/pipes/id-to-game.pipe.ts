import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { Game } from '../entities/game.entity';
import { GameService } from '../game.service';

/**
 * ID to game pipe
 * 
 * Used to transform the `:id` parameter to the corresponding game.
 * 
 * This pipe can be used with `@Param()`.
 */
@Injectable()
export class IdToGamePipe implements PipeTransform<string, Promise<Game>> {

  private readonly gameService: GameService;

  public constructor(gameService: GameService) {
    this.gameService = gameService;
  }

  public async transform(id: string, metadata: ArgumentMetadata): Promise<Game> {
    if (metadata.type === 'param') {
      return await this.gameService.findById(id);
    }
    throw new Error(`${this.constructor.name} can only be used with @Param()`);
  }
}
