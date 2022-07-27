import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

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
}
