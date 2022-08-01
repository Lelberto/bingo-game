import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Action } from './action.entity';

/**
 * Action vote entity
 * 
 * An action vote is a vote for an action by a user.
 * The `value` attribute represents an upVote (if `true`) or a downVote (if `false`).
 */
@Entity()
export class ActionVote {

  @PrimaryColumn('uuid')
  public actionId: string;

  @ManyToOne(() => Action)
  public action: Action;

  @PrimaryColumn('uuid')
  public userId: string;

  @ManyToOne(() => User)
  public user: User;

  @Column('boolean')
  public value: boolean;
}
