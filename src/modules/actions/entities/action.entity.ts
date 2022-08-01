import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Game } from '../../games/entities/game.entity';
import { User } from '../../users/entities/user.entity';
import { ActionVote } from './action-vote.entity';

/**
 * Action entity
 */
@Entity()
export class Action {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'text'
  })
  public description: string;

  @Column({
    type: 'text'
  })
  public result: string;

  @ManyToOne(() => User, user => user.authoredActions)
  public author: User;

  @ManyToOne(() => User, user => user.targetedActions)
  public target: User;

  @ManyToOne(() => Game, game => game.actions)
  public game: Game;

  @OneToMany(() => ActionVote, vote => vote.action)
  public votes: Promise<ActionVote[]>;
}
