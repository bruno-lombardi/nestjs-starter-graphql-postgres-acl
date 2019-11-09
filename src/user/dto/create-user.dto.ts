import { Length, IsEmail, MinLength } from 'class-validator';
import { CreateUserInput } from '../../graphql';

export class CreateUserDto extends CreateUserInput {
  @Length(3, 255, {
    message:
      'Informe um email que possua entre $constraint1 e $constraint2 caracteres.',
  })
  @IsEmail({}, { message: 'O email $value não é válido.' })
  email: string;

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

  @MinLength(6, {
    message: 'Informe uma senha que possua pelo menos $constraint1 caracteres.',
  })
  password: string;
}
