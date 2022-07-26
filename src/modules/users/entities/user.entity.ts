import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
