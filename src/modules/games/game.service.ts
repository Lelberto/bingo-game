import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundException } from '../../global/exceptions/entity.exception';
import { User } from '../users/entities/user.entity';
import { GamePlayerRole } from './entities/game-player.entity';
import { CreateGameDto } from './entities/game.dto';
import { Game } from './entities/game.entity';
import { GameRepository } from './entities/game.repository';
import { GamePlayerService } from './game-player.service';

/**
 * Game service
 */
@Injectable()
export class GameService {

  private readonly gameRepo: GameRepository;
  private readonly gamePlayerService: GamePlayerService;

  public constructor(@InjectRepository(Game) gameRepo: GameRepository, gamePlayerService: GamePlayerService) {
    this.gameRepo = gameRepo;
    this.gamePlayerService = gamePlayerService;
  }

  /**
   * Creates a new game
   * 
   * @param dto DTO
   * @param author Author
   * @returns Created game
   * @async
   */
  public async create(dto: CreateGameDto, author: User): Promise<Game> {
    let game = this.gameRepo.create({ ...dto, authorId: author.id });
    game = await this.gameRepo.save(game);
    await this.gamePlayerService.create(author, game, GamePlayerRole.MANAGER);
    return game;
  }

  /**
   * Finds games
   * 
   * @returns Games
   * @async
   */
  public async find(): Promise<Game[]> {
    return await this.gameRepo.find();
  }

  /**
   * Finds a game by ID
   * 
   * @param id Game ID
   * @returns Game
   * @throws EntityNotFoundException If the game is not found
   * @async
   */
  public async findById(id: Game['id']): Promise<Game> {
    const game = await this.gameRepo.findOne({ where: { id } });
    if (!game) {
      throw new EntityNotFoundException(Game);
    }
    return game;
  }
}
