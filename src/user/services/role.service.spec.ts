import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from './role.service';
import '../../mock-env';
import { ConfigModule } from '../../config/config.module';
import { DatabaseModule } from '../../database/database.module';
import { UserModule } from '../user.module';
import rolesSeed from '../../database/seeds/role.seed';
import PermissionsBuilder from '../../database/seeds/permission.seed';
import { Repository, QueryFailedError, getConnection } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { HttpException } from '@nestjs/common';
import { Permission } from '../entities/permission.entity';

process.env.DB_KEEP_ALIVE = 'false';

describe('RoleService', () => {
  let service: RoleService;
  let permissionRepository: Repository<Permission>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, DatabaseModule, UserModule],
    }).compile();

    service = module.get<RoleService>(RoleService);
    permissionRepository = module.get<Repository<Permission>>(
      getRepositoryToken(Permission),
    );
    const repository = module.get<Repository<Role>>(getRepositoryToken(Role));
    await repository.delete({});
    await repository.save(rolesSeed);
  });

  afterEach(async () => {
    const connection = getConnection();
    await connection.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should load all roles', () => {
    expect(service.roles).toBeTruthy();
    // expect(service.roles.length).toEqual(rolesSeed.length);
  });

  describe('getRoleByName', () => {
    it('should be defined', () => expect(service.getRoleByName).toBeDefined());

    // it('should return a role by name', () => expect(service.getRoleByName('ADMIN').name).toEqual('ADMIN'));
  });

  describe('findRoleBy', () => {
    it('should be defined', () => expect(service.findRoleBy).toBeDefined());

    it('should find a role by name', async () => {
      const role = await service.findRoleBy({
        where: {
          name: 'CUSTOMER',
        },
        relations: ['permissions'],
      });
      expect(role.name).toEqual(
        rolesSeed.find(r => r.name === 'CUSTOMER').name,
      );
    });

    it('should throw exception if no role is found', async () => {
      await expect(
        service.findRoleBy({
          where: {
            name: 'MODERATOR',
          },
        }),
      ).rejects.toThrow(HttpException);
    });
  });

  describe('createRole', () => {
    it('should be defined', () => expect(service.createRole).toBeDefined());

    it('should create a new role', async () => {
      const role = await service.createRole({
        name: 'EMPLOYEE',
        title: 'Funcionário',
      });
      expect(role).toBeTruthy();
      expect(role.id).toBeTruthy();
    });

    it('should not create a role if it already exists', async () => {
      await expect(
        service.createRole({
          name: 'ADMIN',
          title: 'Administrador',
        }),
      ).rejects.toThrow(QueryFailedError);
    });
  });

  describe('updateRole', () => {
    it('should be defined', () => expect(service.updateRole).toBeDefined());

    it('should update a role', async () => {
      const role = await service.updateRole(rolesSeed[0].id, {
        name: 'ADMINISTRATOR',
        title: 'Administrador',
      });
      expect(role.name).toEqual('ADMINISTRATOR');
    });

    it('should throw error if id is inexistent', async () => {
      await expect(
        service.updateRole(999999, {
          name: 'ADMINISTRATOR',
          title: 'Administrador',
        }),
      ).rejects.toThrow(HttpException);
    });
  });

  describe('updateRolePermissions', () => {
    let permissions: Permission[];

    it('should be defined', () =>
      expect(service.updateRolePermissions).toBeDefined());

    beforeEach(async () => {
      await permissionRepository.delete({});
      permissions = await permissionRepository.save(
        PermissionsBuilder.getPermissionsFor('CUSTOMER'),
      );
    });

    it('should update role permissions', async () => {
      const role = await service.updateRolePermissions(
        rolesSeed[0].id,
        permissions,
      );
      expect(role.permissions.length).toBe(permissions.length);
    });

    it('should remove all role permissions if empty', async () => {
      let role = await service.updateRolePermissions(
        rolesSeed[0].id,
        permissions,
      );
      role = await service.updateRolePermissions(role.id, []);
      expect(role.permissions.length).toBe(0);
    });

    it('should remove some permissions', async () => {
      let role = await service.updateRolePermissions(
        rolesSeed[0].id,
        permissions,
      );
      role = await service.updateRolePermissions(
        role.id,
        permissions.slice(0, 3),
      );
      expect(role.permissions.length).toBe(3);
    });
  });

  describe('deleteRole', () => {
    it('should be defined', () => expect(service.deleteRole).toBeDefined());

    it('should delete an existing role', async () => {
      const toDelete = rolesSeed[0].id;
      await service.deleteRole(toDelete);
      expect(
        service.findRoleBy({
          where: {
            id: toDelete,
          },
        }),
      ).rejects.toThrow(HttpException);
    });

    it('should not delete if the row doesn\'t exist', async () => {
      const result = await service.deleteRole(999999);
      expect(result.affected).toBe(0);
    });
  });
});
