import { IUserService } from '../interfaces/user-service.interface';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { FindOneOptions, DeleteResult } from 'typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';
import UserFactory from './factories/user.factory';
import { Pager } from '../../common/models/pager.model';
import { PaginateUserDto } from '../dto/paginate-user.dto';

export class MockUserService implements IUserService {
  async createUser(createDto: CreateUserDto): Promise<User> {
    return UserFactory.build({ ...createDto });
  }

  async findUser(id: string): Promise<User> {
    return UserFactory.build({ id });
  }

  async findUserBy(options: FindOneOptions<User>): Promise<User> {
    const attrs = options.where as Partial<User>;
    return UserFactory.build({ ...attrs });
  }

  async paginateUsers(paginateDto: PaginateUserDto): Promise<Pager<User>> {
    return {
      count: paginateDto.limit,
      data: UserFactory.buildList(paginateDto.limit),
      limit: paginateDto.limit,
      page: paginateDto.page,
      totalPages: paginateDto.page,
    };
  }

  async updateUser(id: string, updateDto: UpdateUserDto): Promise<User> {
    return UserFactory.build({ id, ...updateDto });
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    return {} as DeleteResult;
  }
}
