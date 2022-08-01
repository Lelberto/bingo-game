import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { ActionVote } from './entities/action-vote.entity';
import { ActionVoteRepository } from './entities/action-vote.repository';
import { Action } from './entities/action.entity';

/**
 * Action vote service
 */
@Injectable()
export class ActionVoteService {
  
  private readonly actionVoteRepo: ActionVoteRepository;

  public constructor(@InjectRepository(ActionVote) actionVoteRepo: ActionVoteRepository) {
    this.actionVoteRepo = actionVoteRepo;
  }

  /**
   * Votes for an action
   * 
   * @param action Action
   * @param user User
   * @param value True if upVote, false if downVote
   * @returns Created action vote
   * @throws BadRequestException If the user has already voted for the action
   * @async
   */
  public async vote(action: Action, user: User, value: boolean) {
    // TODO Check if the game attached to this action is running and throw error if true (use action.game)
    if (await this.hasVoted(action, user)) {
      throw new BadRequestException('You have already voted for this action');
    }
    const actionVote = this.actionVoteRepo.create({ action, user, value });
    return await this.actionVoteRepo.save(actionVote);
  }

  /**
   * Gets vote count for an action
   * 
   * @param action Action
   * @returns Vote count for the action
   * @async
   */
  public async countVotes(action: Action) {
    return await this.actionVoteRepo.countBy({ action: { id: action.id } });
  }

  /**
   * Gets up vote count for an action
   * 
   * @param action Action
   * @returns Up vote count for the action
   * @async
   */
  public async countUpVotes(action: Action) {
    return await this.actionVoteRepo.countBy({ action: { id: action.id }, value: true });
  }

  /**
   * Gets down vote count for an action
   * 
   * @param action Action
   * @returns Down vote count for the action
   * @async
   */
  public async countDownVotes(action: Action) {
    return await this.actionVoteRepo.countBy({ action: { id: action.id }, value: false });
  }

  /**
   * Checks if the given user has already voted for the given action
   * 
   * @param action Action
   * @param user User
   * @returns True if the user has already voted for the action, false otherwise
   */
  public async hasVoted(action: Action, user: User) {
    return await this.actionVoteRepo.findOneBy({ action: { id: action.id }, user: { id: user.id } }) != null;
  }
}
