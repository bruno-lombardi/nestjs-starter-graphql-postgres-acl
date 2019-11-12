import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserResolver } from './resolvers/user.resolver';
import { CommonModule } from '../common/common.module';
import { RoleService } from './services/role.service';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { RoleResolver } from './resolvers/role.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Permission]), CommonModule],
  providers: [UserService, UserResolver, RoleService, RoleResolver],
  exports: [UserService, RoleService],
})
export class UserModule {}
