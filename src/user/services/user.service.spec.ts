import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { ConfigModule } from '../../config/config.module';
import { DatabaseModule } from '../../database/database.module';
import { UserModule } from '../user.module';

import '../../mock-env';
import { CreateUserDtoFactory } from '../mocks/factories/user.factory';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, DatabaseModule, UserModule],
    }).compile();

    service = module.get<UserService>(UserService);
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
});
