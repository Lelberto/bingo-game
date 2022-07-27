import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { enumToArray } from '../../../helpers/enum.helper';
import { User } from '../../users/entities/user.entity';

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

  @Column('uuid')
  public authorId: string;

  @ManyToOne(() => User)
  public author: User;

  @Column({
    type: 'varchar',
    length: 15,
    enum: enumToArray(GameStatus),
    default: GameStatus.PENDING
  })
  public status: GameStatus;
}
