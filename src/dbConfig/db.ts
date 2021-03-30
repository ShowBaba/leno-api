import 'reflect-metadata';
import { createConnection } from 'typeorm';
// import { Tedis } from 'tedis';
import logger from '../utils/logger';
import { User } from './entities/User'

export async function intializeDB(): Promise<void> {
  await createConnection({
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": "postgres",
    "password": "postgres",
    "database": "leno-dev",
    entities: [
      User
    ],
    synchronize: true,
  });
  logger.info('Database successfully initialize');
}
