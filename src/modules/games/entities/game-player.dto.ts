import { IsEnum } from 'class-validator';
import { GamePlayerRole } from './game-player.entity';

/**
 * Update game player DTO
 */
export class UpdateGamePlayerDto {
  @IsEnum(GamePlayerRole)
  role: GamePlayerRole;
}