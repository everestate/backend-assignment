import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'sqlite',
  database: process.env.SQLITE_DB,
  synchronize: true,
  logging: false,
  entities: [
    __dirname + '/../**/*.entity{.ts,.js}',
  ],
  migrations: [
    'src/migrations/*.ts',
  ],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default config;
