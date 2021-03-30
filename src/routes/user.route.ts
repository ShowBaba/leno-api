import { Router } from 'express';
import UsersController from '../controllers/user.controller';
import Route from '../interfaces/routes.interface';

class UsersRoute implements Route {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getUsers);
    // this.router.post(`${this.path}`, this.usersController.createUser)
  }
}

export default UsersRoute;
