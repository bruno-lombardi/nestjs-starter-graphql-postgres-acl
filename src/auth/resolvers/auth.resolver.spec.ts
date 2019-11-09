import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from '../services/auth.service';
import { MockAuthService } from '../mocks/auth-service.mock';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('signIn', () => {
    it('should be defined', () => expect(resolver.signIn).toBeDefined());

    it('should call AuthService.signIn with email and password', async () => {
      expect.assertions(2);
      const spy = jest.spyOn(service, 'signIn');
      const signInDto = { email: 'example@email.com', password: '123456' };
      await resolver.signIn(signInDto);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(signInDto.email, signInDto.password);
      spy.mockRestore();
    });
  });
});
