import 'dotenv/config';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import App from './app';
import AuthenticationController from './authentication/authentication.controller';
import config from './ormconfig';
import ProjectController from './project/project.controller';
import UserController from './user/user.controller';
import validateEnv from './utils/validateEnv';

validateEnv();

(async () => {
  try {
    const connection = await createConnection(config);
    await connection.runMigrations();
  } catch (error) {
    console.log('Error while connecting to the database', error);
    return error;
  }
  const app = new App(
    [
      new AuthenticationController(),
      new UserController(),
      new ProjectController(),
    ],
  );
  app.listen();
})();
