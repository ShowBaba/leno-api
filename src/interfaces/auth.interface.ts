import { Request } from 'express';
import { UserInterface } from './users.interface';

export interface dataStoredInToken {
  id: number
};

export interface TokenData {
  token: string;
  expiresIn: number;
};

export interface RequestWithuser extends Request {
  user: UserInterface
};