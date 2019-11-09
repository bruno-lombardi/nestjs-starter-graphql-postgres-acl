import { User } from '../../user/entities/user.entity';
import { JwtPayload } from './jwt-payload.interface';

export interface IAuthService {
  signIn(email: string, password: string): Promise<[string, User]>;
  createToken(payload: JwtPayload): Promise<string>;
  validateUser(payload: JwtPayload): Promise<User>;
}
