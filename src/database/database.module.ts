import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';

import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/services/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        logging: Boolean(configService.get('DB_LOGGING')),
        entities: [resolve(__dirname, '../**/*.entity{.ts,.js}')],
        migrationsRun: Boolean(configService.get('DB_MIGRATE')),
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        synchronize: Boolean(configService.get('DB_SYNC')),
        keepConnectionAlive: Boolean(configService.get('DB_KEEP_ALIVE')),
        dropSchema: Boolean(configService.get('DB_DROP_SCHEMA')),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
