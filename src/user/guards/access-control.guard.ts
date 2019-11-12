import {
  CanActivate,
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { Permission as ACPermission } from '../interfaces/permission.interface';
import { RoleService } from '../services/role.service';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';

@Injectable()
export class ACGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly roleService: RoleService,
  ) {}

  protected async getUser(context: GraphQLExecutionContext): Promise<User> {
    const request = context.getContext().req;
    return request.user;
  }

  protected async getUserRoles(
    context: GraphQLExecutionContext,
  ): Promise<Role[]> {
    const user = await this.getUser(context);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user.roles;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.get<ACPermission[]>(
      'permissions',
      context.getHandler(),
    );
    if (!permissions || !permissions.length) {
      return true;
    }
    const gqlCtx = GqlExecutionContext.create(context);
    let userRoles = await this.getUserRoles(gqlCtx);
    // Map user roles to role service
    userRoles = userRoles.map(role =>
      this.roleService.roles.find(r => r.id === role.id),
    );

    const roleHasPermission = permissions.every(p => {
      // For every Role, assert that...
      return userRoles.every(r => {
        // Role at least one permission
        if (!r.permissions.length) {
          return false;
        }
        // Role has target permission
        const hasPermission = r.permissions.find(
          rp => rp.name === p.name && rp.resource === p.resource,
        );
        return hasPermission && hasPermission.id;
      });
    });

    return roleHasPermission;
  }
}
