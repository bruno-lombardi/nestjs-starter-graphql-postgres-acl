import { User } from '../entities/user.entity';
import { DeleteResult, FindOneOptions } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PaginateUserDto } from '../dto/paginate-user.dto';
import { Pager } from '../../common/models/pager.model';

export interface IUserService {
  createUser(createDto: CreateUserDto): Promise<User>;
  findUser(id: string): Promise<User>;
  findUserBy(options: FindOneOptions<User>): Promise<User>;
  paginateUsers(paginateDto: PaginateUserDto): Promise<Pager<User>>;
  updateUser(id: string, updateDto: UpdateUserDto): Promise<User>;
  deleteUser(id: string): Promise<DeleteResult>;
}
