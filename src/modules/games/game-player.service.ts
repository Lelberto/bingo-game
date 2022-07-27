import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { GamePlayer, GamePlayerRole } from './entities/game-player.entity';
import { GamePlayerRepository } from './entities/game-player.repository';
import { Game } from './entities/game.entity';

/**
 * Game player service
 */
@Injectable()
export class GamePlayerService {

  private readonly gamePlayerRepo: GamePlayerRepository;

  public constructor(@InjectRepository(GamePlayer) gamePlayerRepo: GamePlayerRepository) {
    this.gamePlayerRepo = gamePlayerRepo;
  }

  /**
   * Creates a new game player
   * 
   * @param user User
   * @param game Game
   * @param role Role
   * @returns Created game player
   * @async
   */
  public async create(user: User, game: Game, role?: GamePlayerRole) {
    const gamePlayer = this.gamePlayerRepo.create({ userId: user.id, gameId: game.id, role });
    return await this.gamePlayerRepo.save(gamePlayer);
  }

  /**
   * Finds players by game
   * 
   * @param game Game
   * @returns Players
   * @async
   */
  public async findByGame(game: Game): Promise<GamePlayer[]> {
    return await this.gamePlayerRepo.find({ where: { gameId: game.id } });
  }
}
