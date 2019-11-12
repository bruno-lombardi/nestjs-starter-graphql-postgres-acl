import { Role } from '../entities/role.entity';
import { FindOneOptions } from 'typeorm';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { Permission } from '../entities/permission.entity';
import { PaginateRoleDto } from '../dto/paginate-role.dto';
import { Pager } from '../../common/models/pager.model';

export interface IRoleService {
  getRoleByName(name: string);
  findRoleBy(options: FindOneOptions<Role>): Promise<Role>;
  createRole(createDto: CreateRoleDto): Promise<Role>;
  updateRole(id: number, updateDto: UpdateRoleDto): Promise<Role>;
  updateRolePermissions(roleId: number, permissions: Permission[]);
  paginateRoles(paginateDto: PaginateRoleDto): Promise<Pager<Role>>;
  deleteRole(id: number);
}
