import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '../dtos/users.dto';
import AuthService from '../services/auth.service';
import { UserInterface } from '../interfaces/users.interface';
import { RequestWithuser } from '../interfaces/auth.interface';

class AuthController {
  public authService = new AuthService();

  public signup = async (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateUserDto = req.body;

    try {
      const signupUserData: UserInterface = await this.authService.signup(userData);
      res.status(201).json({
        success: true,
        data: signupUserData,
      })
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    const userData: CreateUserDto = req.body;

    try {
      const findUser  = await this.authService.login(userData);
      res.status(200).json({
        success: true,
        data: findUser
      })
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;