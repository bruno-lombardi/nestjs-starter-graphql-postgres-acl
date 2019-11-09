import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { createTestClient } from 'apollo-server-integration-testing';
import gql from 'graphql-tag';

import '../src/mock-env';
import { GraphQLModule } from '@nestjs/graphql';
import { DocumentNode } from 'graphql';
import { AuthService } from '../src/auth/services/auth.service';
import { UserService } from '../src/user/services/user.service';
import { CreateUserDtoFactory } from '../src/user/mocks/factories/user.factory';
import { User } from '../src/user/entities/user.entity';
import { Pager } from '../src/common/models/pager.model';

interface Options {
  variables?: object;
}

interface ApolloTestingServer {
  query: (
    operation: string | DocumentNode,
    { variables }?: Options,
  ) => Promise<any>;
  mutate: (
    operation: string | DocumentNode,
    { variables }?: Options,
  ) => Promise<any>;
}

describe('UserResolver (e2e)', () => {
  let app;
  let apolloClient: ApolloTestingServer;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const authService: AuthService = moduleFixture.get<AuthService>(
      AuthService,
    );
    const userService: UserService = moduleFixture.get<UserService>(
      UserService,
    );

    const dto = CreateUserDtoFactory.build();
    await userService.createUser({ ...dto });

    const [token] = await authService.signIn(dto.email, dto.password);
    // apolloServer is protected, we need to cast module to any to get it
    const module: GraphQLModule = moduleFixture.get<GraphQLModule>(
      GraphQLModule,
    );

    apolloClient = createTestClient({
      apolloServer: (module as any).apolloServer,
      extendMockRequest: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
  });

  it('Query users', async () => {
    expect.assertions(4);
    const { query } = apolloClient;
    const result = await query(
      gql`
        query {
          users(input: { page: $page, limit: $limit }) {
            page
            limit
            totalPages
            count
            data {
              id
              email
            }
          }
        }
      `,
      {
        variables: {
          page: 1,
          limit: 10,
        },
      },
    );
    const users: Pager<User> = result.data.users;
    expect(users.count).toBeTruthy();
    expect(users.data.length).toBeTruthy();
    expect(users.page).toBe(1);
    expect(users.limit).toBe(10);
  });
});
