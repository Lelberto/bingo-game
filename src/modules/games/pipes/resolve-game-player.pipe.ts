import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { UserService } from '../../users/user.service';
import { GamePlayer } from '../entities/game-player.entity';
import { GamePlayerService } from '../game-player.service';
import { GameService } from '../game.service';

/**
 * Resolve a game player by game and user IDs
 * 
 * This pipe is used with `@Param()`.
 * 
 * Required parameters :
 * - `gameId`: Game ID
 * - `userId`: User ID
 */
@Injectable()
export class ResolveGamePlayerPipe implements PipeTransform<{ gameId: string, userId: string }, Promise<GamePlayer>> {

  private readonly gamePlayerService: GamePlayerService;
  private readonly gameService: GameService;
  private readonly userService: UserService;

  public constructor(gamePlayerService: GamePlayerService, gameService: GameService, userService: UserService) {
    this.gamePlayerService = gamePlayerService;
    this.gameService = gameService;
    this.userService = userService;
  }

  public async transform(value: { gameId: string, userId: string }, metadata: ArgumentMetadata): Promise<GamePlayer> {
    if (metadata.type === 'param') {
      return await this.gamePlayerService.findOneByGame(
        await this.gameService.findById(value.gameId),
        await this.userService.findById(value.userId)
      );
    }
    throw new Error(`${this.constructor.name} can only be used with @Param()`);
  }
}
