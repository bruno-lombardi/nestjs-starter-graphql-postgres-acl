import { IRoleService } from '../interfaces/role-service.interface';
import { Role } from '../entities/role.entity';
import { FindOneOptions, DeleteResult } from 'typeorm';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { Permission } from '../entities/permission.entity';
import { PaginateRoleDto } from '../dto/paginate-role.dto';
import { Pager } from '../../common/models/pager.model';

export class MockRoleService implements IRoleService {
  getRoleByName(name: string) {
    return {} as Role;
  }
  async findRoleBy(options: FindOneOptions<Role>): Promise<Role> {
    return {} as Role;
  }
  async createRole(createDto: CreateRoleDto): Promise<Role> {
    return {} as Role;
  }
  async updateRole(id: number, updateDto: UpdateRoleDto): Promise<Role> {
    return {} as Role;
  }
  async updateRolePermissions(roleId: number, permissions: Permission[]) {
    return {} as Role;
  }
  async deleteRole(id: number) {
    return {} as DeleteResult;
  }

  async paginateRoles(paginateDto: PaginateRoleDto) {
    return {
      count: paginateDto.limit,
      data: [],
      limit: paginateDto.limit,
      page: paginateDto.page,
      totalPages: paginateDto.page,
    };
  }
}
