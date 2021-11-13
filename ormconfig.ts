import { config } from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

if (!process.env.DOTENV_CONFIGURED) {
  config();
}

const TypeOrmModuleConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB__HOST,
  port: +process.env.DB__PORT,
  username: process.env.DB__USERNAME,
  password: process.env.DB__PASSWORD,
  database: process.env.DB__DATABASE,
  synchronize: true,
  entities: ['src/**/*.entity.ts'],
  autoLoadEntities: true,
  migrations: ['db/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'db/migrations',
  },
};

export default TypeOrmModuleConfig;
