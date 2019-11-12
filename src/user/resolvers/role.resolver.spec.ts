import { Test, TestingModule } from '@nestjs/testing';
import { RoleResolver } from './role.resolver';
import { RoleService } from '../services/role.service';
import { MockRoleService } from '../mocks/role-service.mock';

describe('RoleResolver', () => {
  let resolver: RoleResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleResolver,
        {
          provide: RoleService,
          useValue: new MockRoleService(),
        },
      ],
    }).compile();

    resolver = module.get<RoleResolver>(RoleResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
