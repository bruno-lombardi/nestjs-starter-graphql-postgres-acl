import {
  IsNumber,
  Length,
  IsOptional,
  IsBoolean,
  IsEmail,
  MaxLength,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { IPaginateRequest } from '../../common/interfaces/i-paginate-request.interface';
import { PaginateUserInput } from '../../graphql';

export class PaginateUserDto extends PaginateUserInput
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
  firstName?: string;

  @IsOptional()
  @Length(2, 128, {
    message:
      'Sobrenome deve possuir entre $constraint1 e $constraint2 caracteres.',
  })
  lastName?: string;

  @IsOptional()
  @Length(3, 255, {
    message: 'Email deve possuir entre $constraint1 e $constraint2 caracteres.',
  })
  @IsEmail({}, { message: 'Por favor informe um email válido.' })
  email?: string;

  @MaxLength(14, { message: 'Por favor informe um CPF válido.' })
  @IsOptional()
  socialSecurityNumber?: string;
}
