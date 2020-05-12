import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import { ObjectSchema, object, string, bool, number } from '@hapi/joi';

config({ path: process.env.NODE_ENV === 'test' ? '.test.env' : '.env' });

export interface EnvConfig {
  [key: string]: string;
}

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor() {
    this.envConfig = this.validateEnv(process.env);
  }

  private validateEnv(env: EnvConfig) {
    const envSchema: ObjectSchema = object({
      DB_NAME: string().required(),
      DB_USER: string().default('docker'),
      DB_PASSWORD: string().default('docker'),
      DB_HOST: string().default('127.0.0.1'),
      DB_PORT: number().default(5432),
      DB_LOGGING: bool().default(false),
      DB_KEEP_ALIVE: bool().default(false),
      DB_MIGRATE: bool().default(false),
      DB_DROP_SCHEMA: bool().default(false),
      APP_KEY: string().required(),
      PORT: number().default(3333),
    });

    const { error, value } = envSchema.validate(env, { stripUnknown: true });
    if (error) {
      throw error;
    }
    return value;
  }

  get(key: string) {
    return this.envConfig[key];
  }
}
