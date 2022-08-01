import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { enumToArray } from '../../../helpers/enum.helper';
import { Action } from '../../actions/entities/action.entity';
import { User } from '../../users/entities/user.entity';
import { GamePlayer } from './game-player.entity';

/**
 * Game status
 */
export enum GameStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  FINISHED = 'finished'
}

/**
 * Game entity
 */
@Entity()
export class Game {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne(() => User, user => user.games)
  public author: User;

  @Column({
    type: 'varchar',
    length: 15,
    enum: enumToArray(GameStatus),
    default: GameStatus.PENDING
  })
  public status: GameStatus;

  @OneToMany(() => Action, action => action.game)
  public actions: Promise<Action[]>;

  @OneToMany(() => GamePlayer, player => player.game)
  public players: Promise<GamePlayer[]>;
}
