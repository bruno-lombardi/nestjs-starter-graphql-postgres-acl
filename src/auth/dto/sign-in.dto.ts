import { SignInInput } from '../../graphql';
import { IsEmail, MinLength } from 'class-validator';

export class SignInDto extends SignInInput {
  @IsEmail({}, { message: 'Por favor informe um email válido!' })
  email: string;
  @MinLength(6, {
    message:
      'Informe uma senha que contenha no mínimo $constraint1 caracteres.',
  })
  password: string;
}
