import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
    const gamePlayer = this.gamePlayerRepo.create({ user, game, role });
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
    return await this.gamePlayerRepo.findBy({ game: { id: game.id } });
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
    const gamePlayer = await this.gamePlayerRepo.findOneBy({ game: { id: game.id }, user: { id: user.id } });
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
    await this.gamePlayerRepo.save({ ...gamePlayer, ...dto });
  }

  /**
   * Joins a game
   * 
   * @param game Game
   * @param user User
   * @returns Joined game player
   */
  public async join(game: Game, user: User): Promise<GamePlayer> {
    if (this.exists(game, user)) {
      throw new BadRequestException('User already joined the game');
    }
    return this.create(user, game);
  }

  /**
   * Checks if an user exists in a game
   * 
   * @param game Game
   * @param user User
   * @returns True if the user exists in the game
   */
  public async exists(game: Game, user: User): Promise<boolean> {
    try {
      await this.findOneByGame(game, user);
      return true;
    } catch (err) {
      return false;
    }
  }
}
