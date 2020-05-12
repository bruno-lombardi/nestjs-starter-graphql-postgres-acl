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
  verified: boolean;

  @Column({
    unique: true,
    length: 255,
  })
  email: string;

  @Column({
    length: 64,
  })
  password: string;

  @Column({
    unique: true,
    length: 14,
    nullable: true,
  })
  socialSecurityNumber?: string;

  @Column({
    length: 20,
    nullable: true,
  })
  identityDocument?: string;

  @Column({
    length: 20,
    nullable: true,
  })
  phoneNumber?: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  birthDate: Date;

  @Column({
    default: 'MEMBER',
    length: 20,
  })
  role: string;
}
