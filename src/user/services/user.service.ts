import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, FindOneOptions } from 'typeorm';
import { IUserService } from '../interfaces/user-service.interface';
import { CryptoService } from '../../common/services/crypto.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PaginateUserDto } from '../dto/paginate-user.dto';
import { Pager } from '../../common/models/pager.model';
import { PaginateService } from '../../common/services/paginate.service';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly cryptoService: CryptoService,
    private readonly paginateService: PaginateService,
  ) {}

  async createUser(createDto: CreateUserDto): Promise<User> {
    createDto.password = await this.cryptoService.generateHash(
      createDto.password,
    );
    const user = await this.userRepository.save(createDto);
    return user;
  }

  async findUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new HttpException(
        { error: 'User not found', code: HttpStatus.NOT_FOUND },
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async findUserBy(options: FindOneOptions<User>): Promise<User> {
    const user = await this.userRepository.findOne(options);
    if (!user) {
      throw new HttpException(
        { error: 'User not found', code: HttpStatus.NOT_FOUND },
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async paginateUsers(paginateDto: PaginateUserDto): Promise<Pager<User>> {
    const query = this.userRepository.createQueryBuilder('user');
    if (paginateDto.email) {
      query.andWhere('user.email like :email', {
        email: `%${paginateDto.email}%`,
      });
    }
    if (paginateDto.firstName) {
      query.andWhere('user.firstName like :firstName', {
        firstName: `%${paginateDto.firstName}%`,
      });
    }
    if (paginateDto.lastName) {
      query.andWhere('user.lastName like :lastName', {
        lastName: `%${paginateDto.lastName}%`,
      });
    }
    if (paginateDto.socialSecurityNumber) {
      query.andWhere('user.socialSecurityNumber like :socialSecurityNumber', {
        socialSecurityNumber: `%${paginateDto.socialSecurityNumber}%`,
      });
    }
    query
      .skip((paginateDto.page - 1) * paginateDto.limit)
      .take(paginateDto.limit);
    const result = await query.getManyAndCount();
    return this.paginateService.paginate<User>(
      result[0],
      result[1],
      paginateDto.page,
      paginateDto.limit,
    );
  }

  async updateUser(id: string, updateDto: UpdateUserDto): Promise<User> {
    const user = await this.findUser(id);
    this.userRepository.merge(user, updateDto);
    await this.userRepository.save(user);
    return user;
  }

  deleteUser(id: string): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
