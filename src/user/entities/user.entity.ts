import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 128,
  })
  firstName: string;

  @Column({
    length: 128,
  })
  lastName: string;

  @Column({
    default: false,
  })
  confirmed: boolean;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    unique: true,
    length: 14,
    nullable: true,
  })
  socialSecurityNumber: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  birthDate: Date;

  // @ManyToMany(type => Role, role => role.users, {
  //   eager: true,
  //   onUpdate: 'CASCADE',
  //   onDelete: 'SET NULL',
  // })
  // @JoinColumn()
  // roles: Role[];
}
