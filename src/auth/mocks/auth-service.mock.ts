import { IAuthService } from '../interfaces/i-auth-service.interface';
import { User } from '../../user/entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import UserFactory from '../../user/mocks/factories/user.factory';

export class MockAuthService implements IAuthService {
  user: User = UserFactory.build();
  token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRqZnJpemVyMUBnbWFpbC5jb20iLCJpZCI6ImE5YzIxMmU0LTQ3YTktNDY3Yy1hZDA0LWRiNjc5NDg4OGYxNCIsImlhdCI6MTU3MzMwNDA1OSwiZXhwIjoxNTczMzkwNDU5fQ.qbSDiHeaX6mL5HE6vtm0ApWFOJ86nEM9x5Wu_H150Nw';

  async createToken(payload: JwtPayload) {
    return this.token;
  }

  async signIn(email: string, password: string): Promise<[string, User]> {
    return [this.token, this.user];
  }

  async validateUser(payload: JwtPayload) {
    return this.user;
  }
}
