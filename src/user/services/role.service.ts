import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { Permission } from '../entities/permission.entity';
import { IRoleService } from '../interfaces/role-service.interface';
import { PaginateRoleDto } from '../dto/paginate-role.dto';
import { PaginateService } from '../../common/services/paginate.service';

@Injectable()
export class RoleService implements IRoleService {
  roles: Role[] = null;

  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    private readonly paginateService: PaginateService,
  ) {
    this.loadAllRoles().then(roles => (this.roles = roles));
  }

  private async loadAllRoles() {
    if (this.roles === null) {
      try {
        return this.roleRepository.find({ relations: ['permissions'] });
      } catch (err) {
        throw err;
      }
    }
  }

  getRoleByName(name: string) {
    return this.roles.find(r => r.name === name);
  }

  async findRoleBy(options: FindOneOptions<Role>): Promise<Role> {
    const role = await this.roleRepository.findOne(options);
    if (!role) {
      throw new HttpException(
        { error: 'Role not found', code: HttpStatus.NOT_FOUND },
        HttpStatus.NOT_FOUND,
      );
    }
    return role;
  }

  async createRole(createDto: CreateRoleDto): Promise<Role> {
    return await this.roleRepository.save(createDto);
  }

  async updateRole(id: number, updateDto: UpdateRoleDto) {
    const role = await this.findRoleBy({
      where: {
        id,
      },
    });
    this.roleRepository.merge(role, updateDto);
    return await this.roleRepository.save(role);
  }

  async updateRolePermissions(roleId: number, permissions: Permission[]) {
    const role = await this.findRoleBy({
      where: {
        id: roleId,
      },
      relations: ['permissions'],
    });

    role.permissions = [];
    await this.roleRepository.save(role);
    if (!permissions.length) {
      return role;
    }

    role.permissions = permissions;
    return await this.roleRepository.save(role);
  }

  async deleteRole(id: number) {
    return await this.roleRepository.delete(id);
  }

  async paginateRoles(paginateDto: PaginateRoleDto) {
    const query = this.roleRepository.createQueryBuilder('role');
    if (paginateDto.name) {
      query.andWhere('role.name like :name', {
        name: `%${paginateDto.name}%`,
      });
    }
    if (paginateDto.title) {
      query.andWhere('role.title like :title', {
        title: `%${paginateDto.title}%`,
      });
    }

    query
      .skip((paginateDto.page - 1) * paginateDto.limit)
      .take(paginateDto.limit);
    const result = await query.getManyAndCount();
    return this.paginateService.paginate<Role>(
      result[0],
      result[1],
      paginateDto.page,
      paginateDto.limit,
    );
  }
}
