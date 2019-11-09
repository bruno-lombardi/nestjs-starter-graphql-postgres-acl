import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
