import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, FindOneOptions } from 'typeorm';
import { IUserService } from '../interfaces/user-service.interface';
import { CryptoService } from '../../common/services/crypto.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly cryptoService: CryptoService,
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

  paginateUsers(paginateDto: any): Promise<User[]> {
    const query = this.userRepository.createQueryBuilder('user');
    return query.getMany();
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
