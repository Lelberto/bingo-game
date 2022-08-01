import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { enumToArray } from '../../../helpers/enum.helper';
import { User } from '../../users/entities/user.entity';
import { Game } from './game.entity';

/**
 * Game player roles
 */
export enum GamePlayerRole {
  DEFAULT = 'default',
  MANAGER = 'manager'
}

/**
 * Game player entity
 */
@Entity()
export class GamePlayer {

  @PrimaryColumn('uuid')
  @ManyToOne(() => User)
  public user: User;

  @PrimaryColumn('uuid')
  @ManyToOne(() => Game, game => game.players)
  public game: Game;

  @Column({
    type: 'varchar',
    length: 15,
    enum: enumToArray(GamePlayerRole),
    default: GamePlayerRole.DEFAULT
  })
  public role: GamePlayerRole;
}
