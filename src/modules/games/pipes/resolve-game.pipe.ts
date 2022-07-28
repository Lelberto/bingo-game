import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { Game } from '../entities/game.entity';
import { GameService } from '../game.service';

/**
 * Resolve a game by ID
 * 
 * This pipe is used with `@Param('gameId')`.
 */
@Injectable()
export class ResolveGamePipe implements PipeTransform<string, Promise<Game>> {

  private readonly gameService: GameService;

  public constructor(gameService: GameService) {
    this.gameService = gameService;
  }

  public async transform(gameId: string, metadata: ArgumentMetadata): Promise<Game> {
    if (metadata.type === 'param') {
      return await this.gameService.findById(gameId);
    }
    throw new Error(`${this.constructor.name} can only be used with @Param()`);
  }
}
