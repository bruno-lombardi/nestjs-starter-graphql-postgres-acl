import { UpdateUserInput } from '../../graphql';
import { Length } from 'class-validator';

export class UpdateUserDto extends UpdateUserInput {
  @Length(2, 128, {
    message:
      'Informe um nome que possua entre $constraint1 e $constraint2 caracteres.',
  })
  firstName: string;

  @Length(2, 128, {
    message:
      'Informe um sobrenome que possua entre $constraint1 e $constraint2 caracteres.',
  })
  lastName: string;

  @Length(14, 14, { message: 'Informe um CPF válido!' })
  socialSecurityNumber: string;
}
