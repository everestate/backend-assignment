import {
  cleanEnv, port, str,
} from 'envalid';

function validateEnv() {
  cleanEnv(process.env, {
    JWT_SECRET: str(),
    SQLITE_DB: str(),
    PORT: port(),
  });
}

export default validateEnv;
