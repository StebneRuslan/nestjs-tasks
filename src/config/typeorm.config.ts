import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const { DB_HOST, DB_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } = process.env;

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: DB_HOST || '127.0.0.1',
  port: parseInt(DB_PORT) || 5432,
  username: POSTGRES_USER || 'postgres',
  password: POSTGRES_PASSWORD || 'pass',
  database: POSTGRES_DB || 'nest-tasks',
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  synchronize: true
};

console.log('#####', typeOrmConfig);
