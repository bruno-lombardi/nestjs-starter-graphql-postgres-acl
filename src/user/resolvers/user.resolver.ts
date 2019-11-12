import {
  Resolver,
  Mutation,
  Args,
  Query,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { ValidationPipe, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { GqlAuthGuard } from '../../auth/services/gql-auth-guard.service';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { User } from '../../graphql';
import { PaginateUserDto } from '../dto/paginate-user.dto';
import { ACGuard } from '../guards/access-control.guard';
import { UsePermissions } from '../decorators/use-permissions.decorator';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GqlAuthGuard, ACGuard)
  @UsePermissions({
    name: 'create:any',
    resource: 'user',
  })
  @Mutation()
  async createUser(
    @Args('createInput', new ValidationPipe({ transform: true }))
    createDto: CreateUserDto,
  ) {
    return await this.userService.createUser({ ...createDto });
  }

  @UseGuards(GqlAuthGuard, ACGuard)
  @UsePermissions({
    name: 'delete:any',
    resource: 'user',
  })
  @Mutation()
  async deleteUser(@Args('id', ParseUUIDPipe) id: string) {
    const result = await this.userService.deleteUser(id);
    if (result.affected > 0) {
      return true;
    } else {
      return false;
    }
  }

  @UseGuards(GqlAuthGuard, ACGuard)
  @UsePermissions({
    name: 'update:any',
    resource: 'user',
  })
  @Mutation()
  async updateUser(
    @Args('id', ParseUUIDPipe) id: string,
    @Args('updateInput', ValidationPipe) updateDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateDto);
  }

  @UseGuards(GqlAuthGuard, ACGuard)
  @UsePermissions({
    name: 'read:own',
    resource: 'user',
  })
  @Query()
  async me(@CurrentUser() user: User) {
    return user;
  }

  @UseGuards(GqlAuthGuard, ACGuard)
  @UsePermissions({
    name: 'read:own',
    resource: 'role',
  })
  @ResolveProperty()
  async roles(@Parent() user: User) {
    const { roles } = await this.userService.findUserBy({
      where: {
        id: user.id,
      },
      relations: ['roles', 'roles.permissions'],
    });
    return roles;
  }

  @UseGuards(GqlAuthGuard, ACGuard)
  @UsePermissions({
    name: 'read:any',
    resource: 'user',
  })
  @Query()
  async users(@Args('input', ValidationPipe) paginateDto: PaginateUserDto) {
    return await this.userService.paginateUsers(paginateDto);
  }
}
