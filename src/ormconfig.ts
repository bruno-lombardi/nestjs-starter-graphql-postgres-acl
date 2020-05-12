import { ConnectionOptions } from 'typeorm';

const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'docker',
  password: process.env.DB_PASSWORD || 'docker',
  // PUT YOUR TEST DB NAME HERE
  database:
    process.env.NODE_ENV === 'test' ? 'gfrade_test' : process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
  logging: Boolean(process.env.DB_LOGGING) || false,
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

export = ormConfig;
