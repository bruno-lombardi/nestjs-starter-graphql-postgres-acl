import { PaginateRoleInput } from '../../graphql';
import { IPaginateRequest } from '../../common/interfaces/i-paginate-request.interface';
import { IsNumber, IsOptional, Length } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class PaginateRoleDto extends PaginateRoleInput
  implements IPaginateRequest {
  @IsNumber()
  @Type(() => Number)
  @Transform(value => Number(value), { toClassOnly: true })
  limit: number = 10;

  @IsNumber()
  @Type(() => Number)
  @Transform(value => Number(value), { toClassOnly: true })
  page: number = 1;

  @IsOptional()
  @Length(2, 128, {
    message: 'Nome deve possuir entre $constraint1 e $constraint2 caracteres.',
  })
  name?: string;

  @IsOptional()
  @Length(2, 128, {
    message: 'Nome deve possuir entre $constraint1 e $constraint2 caracteres.',
  })
  title?: string;
}
