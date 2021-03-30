import { NextFunction, Request, Response } from 'express';
import HttpException from '../execptions/HttpException';
import logger from '../utils/logger';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';

    logger.error(`StatusCode : ${status}, Message : ${message}`);
    return res.status(status).json({ message });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
