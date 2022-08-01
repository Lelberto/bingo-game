import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundException } from '../../global/exceptions/entity.exception';
import { Game } from '../games/entities/game.entity';
import { User } from '../users/entities/user.entity';
import { CreateActionDto, UpdateActionDto } from './entities/action.dto';
import { Action } from './entities/action.entity';
import { ActionRepository } from './entities/action.repository';

/**
 * Action service
 */
@Injectable()
export class ActionService {

  private readonly actionRepo: ActionRepository;

  public constructor(@InjectRepository(Action) actionRepo: ActionRepository) {
    this.actionRepo = actionRepo;
  }

  /**
   * Creates a new action
   * 
   * @param dto DTO
   * @param author Author
   * @param target Target
   * @param game Game
   * @returns Created action
   * @async
   */
  public async create(dto: CreateActionDto, author: User, target: User, game: Game): Promise<Action> {
    try {
      const action = this.actionRepo.create({ ...dto, author, target, game });
      await this.actionRepo.save(action);
      return action;
    } catch (err) {
      // TODO Make this error handling better (here is when the target username is invalid / not found)
      throw new BadRequestException('Invalid data');
    }
  }

  /**
   * Finds actions
   * 
   * @returns Actions
   * @async
   */
  public async find(): Promise<Action[]> {
    return this.actionRepo.find();
  }

  /**
   * Finds an action by ID
   * 
   * @param id Action ID
   * @returns Action
   * @throws EntityNotFoundException If the action is not found
   * @async
   */
  public async findById(id: Action['id']): Promise<Action> {
    const action = await this.actionRepo.findOneBy({ id });
    if (!action) {
      throw new EntityNotFoundException(Action);
    }
    return action;
  }

  /**
   * Updates an action
   * 
   * @param action Action
   * @param dto DTO
   * @async
   */
  public async update(action: Action, dto: UpdateActionDto): Promise<void> {
    await this.actionRepo.save({ ...action, ...dto });
  }

  /**
   * Deletes an action
   * 
   * @param action Action
   * @async
   */
  public async delete(action: Action): Promise<void> {
    await this.actionRepo.delete({ id: action.id });
  }
}
