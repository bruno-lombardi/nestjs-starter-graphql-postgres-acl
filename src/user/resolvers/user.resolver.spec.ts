import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { IUserService } from '../interfaces/user-service.interface';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { DeleteResult, FindOneOptions } from 'typeorm';
import { UserService } from '../services/user.service';

class MockUserService implements IUserService {
  async paginateUsers(paginateDto: any): Promise<User[]> {
    return [{}] as User[];
  }
  async findUser(id: string): Promise<User> {
    return {} as User;
  }
  async findUserBy(options: FindOneOptions<User>): Promise<User> {
    return {} as User;
  }
  async createUser(createDto: CreateUserDto): Promise<User> {
    return {} as User;
  }
  async updateUser(uid: string, updateDto: UpdateUserDto): Promise<User> {
    return {} as User;
  }
  async deleteUser(uid: string): Promise<DeleteResult> {
    return {} as DeleteResult;
  }
}

describe('UserResolver', () => {
  let resolver: UserResolver;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: new MockUserService(),
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createUser', () => {
    it('should be defined', () => expect(resolver.createUser).toBeDefined());
  });
});
