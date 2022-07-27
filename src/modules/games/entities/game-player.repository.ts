import { Repository } from 'typeorm';
import { GamePlayer } from './game-player.entity';

/**
 * Game player repository
 */
export class GamePlayerRepository extends Repository<GamePlayer> {}
