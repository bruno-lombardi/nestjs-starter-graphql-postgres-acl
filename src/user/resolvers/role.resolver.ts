import {
  Resolver,
  Mutation,
  Args,
  Query,
  Parent,
  ResolveProperty,
} from '@nestjs/graphql';
import { RoleService } from '../services/role.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { ValidationPipe, UseGuards, ParseIntPipe } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/services/gql-auth-guard.service';
import { ACGuard } from '../guards/access-control.guard';
import { UsePermissions } from '../decorators/use-permissions.decorator';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { Permission } from '../entities/permission.entity';
import { PermissionInput } from '../../graphql';
import { plainToClass } from 'class-transformer';
import { Role } from '../entities/role.entity';
import { PaginateRoleDto } from '../dto/paginate-role.dto';

@Resolver('Role')
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(GqlAuthGuard, ACGuard)
  @UsePermissions({
    name: 'read:any',
    resource: 'role',
  })
  @Query()
  async role(@Args('id', ParseIntPipe) id: number) {
    return await this.roleService.findRoleBy({ where: { id } });
  }

  @UseGuards(GqlAuthGuard, ACGuard)
  @UsePermissions({
    name: 'read:any',
    resource: 'role',
  })
  @Query()
  async roles(
    @Args('input', new ValidationPipe({ transform: true }))
    paginateDto: PaginateRoleDto,
  ) {
    return await this.roleService.paginateRoles(paginateDto);
  }

  @UseGuards(GqlAuthGuard, ACGuard)
  @UsePermissions({
    name: 'read:any',
    resource: 'permission',
  })
  @ResolveProperty()
  async permissions(@Parent() role: Role) {
    if (!role.permissions) {
      role = await this.roleService.findRoleBy({
        where: { id: role.id },
        relations: ['permissions'],
      });
      return role.permissions;
    }
    return role.permissions;
  }

  @UseGuards(GqlAuthGuard, ACGuard)
  @UsePermissions({
    name: 'read:any',
    resource: 'user',
  })
  @ResolveProperty()
  async users(@Parent() role: Role) {
    if (!role.users) {
      role = await this.roleService.findRoleBy({
        where: { id: role.id },
        relations: ['users'],
      });
      return role.users;
    }
    return role.users;
  }

  @UseGuards(GqlAuthGuard, ACGuard)
  @UsePermissions({
    name: 'create:any',
    resource: 'role',
  })
  @Mutation()
  async createRole(
    @Args('createInput', new ValidationPipe({ transform: true }))
    createDto: CreateRoleDto,
  ) {
    return await this.roleService.createRole(createDto);
  }

  @UseGuards(GqlAuthGuard, ACGuard)
  @UsePermissions({
    name: 'update:any',
    resource: 'role',
  })
  @Mutation()
  async updateRole(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateInput', new ValidationPipe({ transform: true }))
    updateDto: UpdateRoleDto,
  ) {
    return await this.roleService.updateRole(id, updateDto);
  }

  @UseGuards(GqlAuthGuard, ACGuard)
  @UsePermissions({
    name: 'delete:any',
    resource: 'role',
  })
  @Mutation()
  async deleteRole(@Args('id', ParseIntPipe) id: number) {
    const result = await this.roleService.deleteRole(id);
    return result.affected > 0;
  }

  @UseGuards(GqlAuthGuard, ACGuard)
  @UsePermissions({
    name: 'update:any',
    resource: 'role',
  })
  @Mutation()
  async updateRolePermissions(
    @Args('id', ParseIntPipe) id: number,
    @Args('permissions') permissions: PermissionInput[],
  ) {
    return this.roleService.updateRolePermissions(
      id,
      plainToClass(Permission, permissions),
    );
  }
}
