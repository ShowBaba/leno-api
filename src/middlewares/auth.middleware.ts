import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import HttpException from '../execptions/HttpException';
import { RequestWithuser, dataStoredInToken } from '../interfaces/auth.interface';

const authMiddleware = async (req: RequestWithuser, res: Response, next: NextFunction) => {
  // TODO: verify token
}