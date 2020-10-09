
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const { DB_HOST, DB_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  // host: DB_HOST,
  // port: parseInt(DB_PORT),
  // username: POSTGRES_USER,
  // password: POSTGRES_PASSWORD,
  // database: POSTGRES_DB,
  host: '127.0.0.1',
  port: 32768,
  username: 'postgres',
  password: 'pass',
  database: 'nest-tasks',
  entities: [`${__dirname}/../**/*.entity.ts`],
  synchronize: true
};
