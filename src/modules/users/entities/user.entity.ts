import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ActionVote } from '../../actions/entities/action-vote.entity';
import { Action } from '../../actions/entities/action.entity';
import { Game } from '../../games/entities/game.entity';

/**
 * User entity
 */
@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'varchar',
    unique: true
  })
  public googleId: string;

  @Column({
    type: 'varchar',
    unique: true,
    length: 24
  })
  public username: string;

  @Column({
    type: 'varchar',
    unique: true
  })
  public email: string;

  @Column({
    type: 'varchar',
    length: 30
  })
  public name: string;

  @OneToMany(() => Game, game => game.author)
  public games: Promise<Game[]>;

  @OneToMany(() => Action, action => action.author)
  public authoredActions: Promise<Action[]>;

  @OneToMany(() => Action, action => action.target)
  public targetedActions: Promise<Action[]>;

  @OneToMany(() => ActionVote, vote => vote.user)
  public votes: Promise<ActionVote[]>;
}
