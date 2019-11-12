import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from '../services/user.service';
import { MockUserService } from '../mocks/user-service.mock';
import UserFactory, {
  CreateUserDtoFactory,
  UpdateUserDtoFactory,
} from '../mocks/factories/user.factory';
import { RoleService } from '../services/role.service';
import { MockRoleService } from '../mocks/role-service.mock';

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
        {
          provide: RoleService,
          useValue: new MockRoleService(),
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

    it('should call UserService.createUser method with createDto', async () => {
      expect.assertions(2);
      const spy = jest.spyOn(service, 'createUser');
      const createDto = CreateUserDtoFactory.build();
      await resolver.createUser(createDto);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(createDto);
      spy.mockRestore();
    });
  });

  describe('deleteUser', () => {
    it('should be defined', () => expect(resolver.deleteUser).toBeDefined());

    it('should call UserService.deleteUser method with uuid', async () => {
      expect.assertions(2);
      const spy = jest.spyOn(service, 'deleteUser');
      const id = '0e9ddb99-06ca-4c22-ab19-defbef11fde4';
      await resolver.deleteUser(id);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(id);
      spy.mockRestore();
    });
  });

  describe('me', () => {
    it('should be defined', () => expect(resolver.me).toBeDefined());

    it('should call UserService.deleteUser method with uuid', async () => {
      expect.assertions(1);
      const user = UserFactory.build();
      const resolved = await resolver.me(user);
      expect(resolved).toEqual(user);
    });
  });

  describe('updateUser', () => {
    it('should be defined', () => expect(resolver.updateUser).toBeDefined());

    it('should call UserService.updateUser method with uuid and updateDto', async () => {
      expect.assertions(2);
      const spy = jest.spyOn(service, 'updateUser');
      const id = '0e9ddb99-06ca-4c22-ab19-defbef11fde4';
      const updateDto = UpdateUserDtoFactory.build();
      await resolver.updateUser(id, updateDto);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(id, updateDto);
      spy.mockRestore();
    });
  });

  describe('users', () => {
    it('should be defined', () => expect(resolver.users).toBeDefined());

    it('should call UserService.paginateUsers with paginateDto', async () => {
      expect.assertions(2);
      const spy = jest.spyOn(service, 'paginateUsers');
      const paginateDto = { page: 1, limit: 1 };
      await resolver.users(paginateDto);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(paginateDto);
      spy.mockRestore();
    });
  });
});
