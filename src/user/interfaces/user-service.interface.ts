import { User } from '../entities/user.entity';
import { DeleteResult, FindOneOptions } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export interface IUserService {
  createUser(createDto: CreateUserDto): Promise<User>;
  findUser(id: string): Promise<User>;
  findUserBy(options: FindOneOptions<User>): Promise<User>;
  paginateUsers(paginateDto: any): Promise<User[]>;
  updateUser(id: string, updateDto: UpdateUserDto): Promise<User>;
  deleteUser(id: string): Promise<DeleteResult>;
}
