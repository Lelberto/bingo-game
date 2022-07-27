import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundException } from '../../global/exceptions/entity.exception';
import { User } from '../users/entities/user.entity';
import { CreateGameDto } from './entities/game.dto';
import { Game } from './entities/game.entity';
import { GameRepository } from './entities/game.repository';

/**
 * Game service
 */
@Injectable()
export class GameService {

  private readonly gameRepo: GameRepository;

  public constructor(@InjectRepository(Game) gameRepo: GameRepository) {
    this.gameRepo = gameRepo;
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
    const game = this.gameRepo.create({ ...dto, authorId: author.id });
    return await this.gameRepo.save(game);
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
