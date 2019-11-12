import UserFactory from '../../user/mocks/factories/user.factory';
import { CryptoService } from '../../common/services/crypto.service';
import { User } from '../../user/entities/user.entity';

const crypto = new CryptoService();

export const admin = async (): Promise<User> => {
  const password = await crypto.generateHash('admin123');

  return UserFactory.build({
    confirmed: true,
    email: 'admin@admin.com',
    firstName: 'Bruno',
    lastName: 'Lombardi',
    password,
  });
};

export const users = async (): Promise<User[]> => {
  const password = await crypto.generateHash('123456');
  return UserFactory.buildList(20).map(u => ({
    ...u,
    password,
  }));
};
