import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

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

  @Column('uuid')
  public authorId: string;

  @ManyToOne(() => User)
  public author: User;

  @Column('uuid')
  public targetId: string;

  @ManyToOne(() => User)
  public target: User;
}
