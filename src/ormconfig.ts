import { ConnectionOptions } from 'typeorm';
import { config } from 'dotenv';

config();

const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'docker',
  password: process.env.DB_PASSWORD || 'docker',
  database: process.env.DB_NAME || 'gfrade',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
  logging: Boolean(process.env.DB_LOGGING) || false,
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

export = ormConfig;
