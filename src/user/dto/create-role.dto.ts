import { Length, MaxLength, IsOptional } from 'class-validator';
import { RoleInput } from '../../graphql';

export class CreateRoleDto extends RoleInput {
  @Length(2, 128, {
    message:
      'Informe um nome que possua entre $constraint1 e $constraint2 caracteres.',
  })
  name: string;

  @Length(2, 128, {
    message:
      'Informe um título que possua entre $constraint1 e $constraint2 caracteres.',
  })
  title: string;

  @MaxLength(255, {
    message: 'A descrição deve possuir no máximo $constraint1 caracteres.',
  })
  @IsOptional()
  description?: string;
}
