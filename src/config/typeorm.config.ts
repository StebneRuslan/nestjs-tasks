import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const { DB_HOST, DB_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, TYPEORM_SYNC } = process.env;
const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type || 'postgres',
  host: DB_HOST || dbConfig.host,
  port: parseInt(DB_PORT) || dbConfig.port,
  username: POSTGRES_USER || dbConfig.user,
  password: POSTGRES_PASSWORD || dbConfig.password,
  database: POSTGRES_DB || dbConfig.database,
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  synchronize: dbConfig.synchronize
};
