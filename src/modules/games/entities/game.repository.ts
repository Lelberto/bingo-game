import { In, Repository } from 'typeorm';
import { Game } from './game.entity';

/**
 * Game repository
 */
export class GameRepository extends Repository<Game> {

  /**
   * Checks if game(s) exists
   * 
   * @param ids Game IDs
   * @returns True if the game(s) exists, false otherwise
   * @async
   */
   public async exists(...ids: Game['id'][]): Promise<boolean> {
    return await this.count({ where: { id: In([...ids]) } }) === ids.length;
  }
}
