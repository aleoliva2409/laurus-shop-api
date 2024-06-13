import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

ConfigModule.forRoot();
const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: +configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [join(__dirname, '../**/entities/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
  synchronize: false,
  logging: configService.get('environment') === 'dev',
  migrationsRun: false, //?? corre instantaneamente las migrationes generadas cuando se reinicia
  migrationsTableName: 'migrations',
};

export default new DataSource(dataSourceOptions);
