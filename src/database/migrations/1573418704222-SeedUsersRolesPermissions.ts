import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { users, admin } from '../seeds/user.seed';
import { Role } from '../../user/entities/role.entity';
import { Permission } from '../../user/entities/permission.entity';

import rolesSeed from '../seeds/role.seed';
import PermissionBuilder from '../seeds/permission.seed';

export class SeedUsersRolesPermissions1573418704222
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const userRepository = queryRunner.manager.getRepository<User>(User);
    const roleRepository = queryRunner.manager.getRepository<Role>(Role);
    const permissionRepository = queryRunner.manager.getRepository<Permission>(
      Permission,
    );

    const adminPermissions = await permissionRepository.save(
      PermissionBuilder.getPermissionsFor('ADMIN'),
    );
    const managerPermissions = await permissionRepository.save(
      PermissionBuilder.getPermissionsFor('MANAGER'),
    );
    const customerPermissions = await permissionRepository.save(
      PermissionBuilder.getPermissionsFor('CUSTOMER'),
    );

    const roles: Role[] = await roleRepository.save(rolesSeed);

    const adminRole = roles.find(r => r.name === 'ADMIN');
    const managerRole = roles.find(r => r.name === 'MANAGER');
    const customerRole = roles.find(r => r.name === 'CUSTOMER');

    adminRole.permissions = adminPermissions;
    managerRole.permissions = managerPermissions;
    customerRole.permissions = customerPermissions;

    await roleRepository.save([].concat(adminRole, managerRole, customerRole));
    const adminUser = await admin();
    let customersUsers = await users();
    await userRepository.save([].concat(adminUser, customersUsers));
    customersUsers = customersUsers.map(u => ({
      roles: [customerRole],
      ...u,
    }));
    adminUser.roles = [adminRole];
    await userRepository.save([].concat(adminUser, customersUsers));
  }

  // tslint:disable-next-line: no-empty
  public async down(queryRunner: QueryRunner): Promise<any> {
    const userRepository = queryRunner.manager.getRepository<User>(User);
    const roleRepository = queryRunner.manager.getRepository<Role>(Role);
    const permissionRepository = queryRunner.manager.getRepository<Permission>(
      Permission,
    );

    userRepository.delete({});
    roleRepository.delete({});
    permissionRepository.delete({});
  }
}
