import cookieParser from 'cookie-parser';
import express, { Router } from 'express';
import dotenv from 'dotenv'
import helmet from 'helmet';
import morgan from 'morgan';
import hpp from 'hpp';
import cors from 'cors';
import compression from 'compression';
import vars from './utils/variables';
import loggers from './utils/logger';
import { intializeDB } from './dbConfig/db';
import errorMiddleware from './middlewares/error.middleware';
import Routes from './interfaces/routes.interface';

dotenv.config();

class App {
  public app: express.Application;
  public port: string | undefined | number;
  public env: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = vars.port;
    this.env = process.env.NODE_ENV || 'development';

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      loggers.info(`🚀 Server started at http://localhost:3000`);
    });
    return;
  }

  // used in testing
  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    await intializeDB();
    const redisPORT = Number(vars.redisPort || 6379);
    // initializeCache(redisPORT);
  };

  private initializeMiddlewares() {
    if (this.env === 'production') {
      this.app.use(morgan('combined'));
      // TODO: eidt cors origin url
      this.app.use(cors({ origin: true, credentials: true }));
    } else if (this.env === 'development') {
      this.app.use(morgan('dev'));
      this.app.use(cors({ origin: true, credentials: true }));
    }

    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;