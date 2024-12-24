import { ConfigModule, ConfigService } from '@nestjs/config';

import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';

ConfigModule.forRoot();
const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.getOrThrow<string>('DB_HOST'),
  port: +configService.getOrThrow('DB_PORT'),
  username: configService.getOrThrow<string>('DB_USER'),
  password: configService.getOrThrow<string>('DB_PASSWORD'),
  database: configService.getOrThrow<string>('DB_NAME'),
  entities: [join(__dirname, '../**/entities/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
  synchronize: false,
  logging: configService.get('environment') === 'dev',
  migrationsRun: false,
  migrationsTableName: 'migrations',
};

export default new DataSource(dataSourceOptions);
