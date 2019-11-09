import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { ConfigModule } from '../../config/config.module';
import { DatabaseModule } from '../../database/database.module';
import { UserModule } from '../user.module';

import '../../mock-env';
import {
  CreateUserDtoFactory,
  UpdateUserDtoFactory,
} from '../mocks/factories/user.factory';
import { User } from '../entities/user.entity';
import { HttpException } from '@nestjs/common';
import { QueryFailedError, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, DatabaseModule, UserModule],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should be defined', () => expect(service.createUser).toBeDefined());

    it('should create an user with valid dto', async () => {
      expect.assertions(4);
      const dto = CreateUserDtoFactory.build();
      const user = await service.createUser(dto);
      expect(user.id).toBeTruthy();
      expect(user.email).toEqual(dto.email);
      expect(user.firstName).toEqual(dto.firstName);
      expect(user.lastName).toEqual(dto.lastName);
    });
  });

  describe('deleteUser', () => {
    let userId: string;
    beforeEach(async () => {
      const { id } = await service.createUser(CreateUserDtoFactory.build());
      userId = id;
    });

    it('should be defined', () => expect(service.deleteUser).toBeDefined());

    it('should delete an user if it exists', async () => {
      expect.assertions(1);
      const result = await service.deleteUser(userId);
      expect(result.affected).toBeGreaterThan(0);
    });
  });

  describe('findUser', () => {
    let user: User;

    beforeEach(async () => {
      user = await service.createUser(CreateUserDtoFactory.build());
    });

    it('should be defined', () => expect(service.findUser).toBeDefined());

    it('should find an user if valid id', async () => {
      expect.assertions(1);
      const found = await service.findUser(user.id);
      expect(found).toEqual(user);
    });

    it('should not find user if inexistent id', async () => {
      expect.assertions(1);
      await expect(
        service.findUser('0ed232f7-d43c-4c76-9e0a-f8bfbee6186e'),
      ).rejects.toThrowError(HttpException);
    });

    it('should not find user if invalid uuid', async () => {
      expect.assertions(1);
      await expect(service.findUser('0ed232f7')).rejects.toThrowError(
        QueryFailedError,
      );
    });
  });

  describe('findUserBy', () => {
    let user: User;

    beforeEach(async () => {
      user = await service.createUser(CreateUserDtoFactory.build());
    });

    it('should be defined', () => expect(service.findUserBy).toBeDefined());

    it('should find user by email', async () => {
      expect.assertions(1);
      const found = await service.findUserBy({ where: { email: user.email } });
      expect(found.email).toEqual(user.email);
    });

    it('should find user by firstName', async () => {
      expect.assertions(1);
      const found = await service.findUserBy({
        where: { firstName: user.firstName },
      });
      expect(found.firstName).toEqual(user.firstName);
    });

    it('should find user by socialSecurityNumber', async () => {
      expect.assertions(1);
      const found = await service.findUserBy({
        where: { socialSecurityNumber: user.socialSecurityNumber },
      });
      expect(found.socialSecurityNumber).toEqual(user.socialSecurityNumber);
    });

    it('should not find user if invalid params', async () => {
      expect.assertions(1);
      await expect(
        service.findUserBy({
          where: { email: 'okfaoskfoaksodfk@asdfasdfasd.com' },
        }),
      ).rejects.toThrowError(HttpException);
    });
  });

  describe('updateUser', () => {
    let user: User;

    beforeEach(async () => {
      user = await service.createUser(CreateUserDtoFactory.build());
    });

    it('should be defined', () => expect(service.updateUser).toBeDefined());

    it('should update user with valid data and id', async () => {
      expect.assertions(3);
      const dto = UpdateUserDtoFactory.build();
      const updated = await service.updateUser(user.id, dto);
      expect(updated.firstName).toEqual(dto.firstName);
      expect(updated.lastName).toEqual(dto.lastName);
      expect(updated.socialSecurityNumber).toEqual(dto.socialSecurityNumber);
    });

    it('should not update user if non existent id', async () => {
      expect.assertions(1);
      const dto = UpdateUserDtoFactory.build();
      await expect(
        service.updateUser('0ed232f7-d43c-4c76-9e0a-f8bfbee6186e', dto),
      ).rejects.toThrowError(HttpException);
    });

    it('should not update user if invalid uuid', async () => {
      expect.assertions(1);
      const dto = UpdateUserDtoFactory.build();
      await expect(service.updateUser('0ed232f7', dto)).rejects.toThrowError(
        QueryFailedError,
      );
    });
  });

  describe('paginateUsers', () => {
    let users: User[];

    beforeEach(async () => {
      await repository.delete({});
      const dtos = CreateUserDtoFactory.buildList(20);
      users = await repository.save(dtos);
      users[0].socialSecurityNumber = '000.000.000-11';
      await repository.save(users[0]);
    });

    it('should be defined', () => expect(service.paginateUsers).toBeDefined());

    it('should paginate users', async () => {
      expect.assertions(4);
      const result = await service.paginateUsers({
        page: 1,
        limit: 10,
      });
      expect(result.count).toBe(20);
      expect(result.data.length).toBe(10);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
    });

    it('should paginate users by email', async () => {
      expect.assertions(4);
      const result = await service.paginateUsers({
        page: 1,
        limit: 10,
        email: users[9].email,
      });
      expect(result.count).toBe(1);
      expect(result.data.length).toBe(1);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
    });

    it('should paginate users by firstName', async () => {
      expect.assertions(3);
      const result = await service.paginateUsers({
        page: 1,
        limit: 10,
        firstName: users[2].firstName,
      });
      expect(result.data.length).toBeTruthy();
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
    });

    it('should paginate users by lastName', async () => {
      expect.assertions(3);
      const result = await service.paginateUsers({
        page: 1,
        limit: 10,
        lastName: users[4].lastName,
      });
      expect(result.data.length).toBeTruthy();
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
    });

    it('should paginate users by socialSecurityNumber', async () => {
      expect.assertions(5);
      const result = await service.paginateUsers({
        page: 1,
        limit: 10,
        socialSecurityNumber: users[0].socialSecurityNumber,
      });
      expect(result.count).toBe(1);
      expect(result.totalPages).toBe(1);
      expect(result.data.length).toBe(1);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(10);
    });
  });
});
