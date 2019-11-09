import { Factory } from 'rosie';
import { User } from '../../entities/user.entity';
import { name, internet, date, random, helpers } from 'faker/locale/pt_BR';
import { CreateUserDto } from '../../dto/create-user.dto';

export default Factory.define<User>('user').attrs({
  confirmed: false,
  email: () => internet.email(),
  birthDate: () => date.past(20),
  firstName: () => name.firstName(),
  id: () => random.uuid(),
  lastName: () => name.lastName(),
  password: () => internet.password(6),
  socialSecurityNumber: () =>
    helpers.replaceSymbolWithNumber('###.###.###-##', '#'),
});

export const CreateUserDtoFactory = Factory.define<CreateUserDto>(
  'createUserDto',
).attrs({
  email: () => internet.email(),
  firstName: () => name.firstName(),
  lastName: () => name.lastName(),
  password: () => internet.password(6),
});
