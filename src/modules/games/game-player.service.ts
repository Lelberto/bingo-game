import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UpdateGamePlayerDto } from './entities/game-player.dto';
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

  /**
   * Finds player by user and game
   * 
   * @param game Game
   * @param user User
   * @returns Player
   * @async
   */
  public async findOneByGame(game: Game, user: User): Promise<GamePlayer> {
    const gamePlayer = await this.gamePlayerRepo.findOne({ where: { gameId: game.id, userId: user.id } });
    if (!gamePlayer) {
      throw new NotFoundException('Game player not found');
    }
    return gamePlayer;
  }

  /**
   * Updates a game player
   * 
   * @param gamePlayer Game player
   * @param dto DTO
   * @returns Updated game player
   */
  public async update(gamePlayer: GamePlayer, dto: UpdateGamePlayerDto, authGamePlayer: GamePlayer): Promise<void> {
    if (authGamePlayer.role !== GamePlayerRole.MANAGER) {
      throw new UnauthorizedException('Only managers can update the game');
    }
    await this.gamePlayerRepo.update(gamePlayer, dto);
  }
}
