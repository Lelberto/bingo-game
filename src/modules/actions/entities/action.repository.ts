import { In, Repository } from 'typeorm';
import { Action } from './action.entity';

/**
 * Action repository
 */
export class ActionRepository extends Repository<Action> {

  /**
   * Checks if action(s) exists
   * 
   * @param ids Action IDs
   * @returns True if the action(s) exists, false otherwise
   * @async
   */
  public async exists(...ids: Action['id'][]): Promise<boolean> {
    return await this.count({ where: { id: In([...ids]) } }) === ids.length;
  }
}
