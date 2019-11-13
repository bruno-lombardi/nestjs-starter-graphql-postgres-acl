## GraphQL Application Starter with NestJS and Postgres

Built with [Nest](https://github.com/nestjs/nest), a TypeScript based NodeJS Web framework.

## Installation
We use **yarn** by default, but if you want, you can use **npm**, just make sure to delete `yarn.lock`, then run `npm install`. Some scripts expect `yarn` is being used, so check `package.json` and change them to use `npm`.
```bash
$ yarn install

# if changing to npm
$ npm install
```

## Running the app

### Configuration
Make sure to setup your .env file. See [.env.example](.env.example), and ConfigService
inside [src/config/services/config.service.ts](src/config/services/config.service.ts), every configuration is validated and done there.

### Database migration
You need to configure database connection info inside [src/ormconfig.ts](src/ormconfig.ts) to run migrations, there you can see an example. After config, just run `yarn run typeorm:run`, and the [existing migrations](src/database/migrations) will be executed.

It's **important** to note that migrations also seeds the database with initial roles and permissions, so you can take advantage of ACL in your app.  

### Starting server
You're now ready to start the server, which in development or watch mode launches a GraphQL Playground at [localhost:3333/graphql](http://localhost:3333/graphql), where you can test Queries, Mutations and see how the application works.

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Development
Make changes to the code in watch mode, and see them take effect right away. Any changes you make to database entities, either are they adding, changing, removing fields, relations or other entities, you're able to automatically create the migrations using `yarn run typeorm:migrate <MigrationName>` script.

**Example**:
```bash
$ yarn run typeorm:migrate CreatePostsTable
```

## Test
Testing hits the database for now, so make sure you are running a local Postgres database, which you can configure inside [src/mock-env.ts](src/mock-env.ts). The properties you define there you overwrite `process.env` variables, which is how the [ConfigService](src/config/services/config.service.ts) loads configuration.
```bash
# unit tests
$ yarn run test
# specific test file
$ yarn run test user.service.spec.ts
# watch mode
$ yarn run test:watch

# e2e tests (unavailable for now)
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

# Packages we <3
- [@nestjs/graphql](https://github.com/nestjs/graphql)
- [graphql](https://github.com/graphql/graphql-js)
- [@nestjs/typeorm](https://www.npmjs.com/package/@nestjs/typeorm)
- [typeorm](https://github.com/typeorm/typeorm)
- [class-transformer](https://github.com/typestack/class-transformer)
- [class-validator](https://github.com/typestack/class-validator)
- [dotenv](https://github.com/motdotla/dotenv)
- [@nestjs/passport](https://github.com/nestjs/passport)
- [passport](https://github.com/jaredhanson/passport)
- [apollo-server-express](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-express)