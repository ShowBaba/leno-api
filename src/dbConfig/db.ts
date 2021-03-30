import 'reflect-metadata';
import { createConnection } from 'typeorm';
// import { Tedis } from 'tedis';
import logger from '../utils/logger';
import { User } from './entities/User'
import dotenv from 'dotenv';
dotenv.config()

export async function intializeDB(): Promise<void> {
  await createConnection({
    "type": "postgres",
    "host": "ec2-18-204-101-137.compute-1.amazonaws.com",
    "port": 5432,
    "username": "mubjxkeulkbrqj",
    "password": "6e58789ba9ad48856b2356abd031bed4b8f5499e04e5d0a16573621b28bcb7c3",
    "database": "d8hopie1mv50av",
    entities: [
      User
    ],
    synchronize: true,
  });
  logger.info('Database successfully initialize');
}
