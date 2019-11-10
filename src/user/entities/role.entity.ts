import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Permission } from './permission.entity';
import { User } from './user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 128,
    unique: true,
  })
  name: string;

  @ManyToMany(type => Permission, permission => permission.roles, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    eager: true,
  })
  permissions: Permission[];

  // @ManyToMany(type => User, user => user.roles, {
  //   onUpdate: 'CASCADE',
  //   onDelete: 'SET NULL',
  // })
  // users: User[];

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
