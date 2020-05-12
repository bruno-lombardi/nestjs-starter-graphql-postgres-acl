import {
  CanActivate,
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../entities/user.entity';
import { Permission as ACPermission } from '../interfaces/permission.interface';
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql';

@Injectable()
export class ACGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  protected async getUser(context: GraphQLExecutionContext): Promise<User> {
    const request = context.getContext().req;
    return request.user;
  }

  protected async getUserRole(
    context: GraphQLExecutionContext,
  ): Promise<string> {
    const user = await this.getUser(context);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user.role;
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
    const role = await this.getUserRole(gqlCtx);
    // Map user roles to role service
    return role !== undefined;
  }
}
