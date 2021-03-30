import { Request, Response, NextFunction } from 'express';
import { CreateUserDto } from '../dtos/users.dto';
import { UserInterface } from '../interfaces/users.interface'
// import { ErrorInterface } from '../interfaces/error.interface';
import userService from '../services/users.service';

class UsersController {
  public userService = new userService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: Array<UserInterface> = await this.userService.findAllUser();
      return res.status(200).json({
        success: true,
        data: findAllUsersData
      })
    } catch (error) {
      next(error);
    }
  }

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const userId = Number(req.params.id);

    try {
      const findOneUserData: UserInterface = await this.userService.findUserById(userId);
      res.status(200).json({
        success: true,
        data: findOneUserData
      })
    } catch (error) {
      next(error);
    }
  }

  // public createUser = async (req: Request, res: Response, next: NextFunction) => {
  //   const userData: CreateUserDto = req.body;

  //   try {
  //     const createUserData: UserInterface = await this.userService.
  //     res.status(201).json({
  //       success: true,
  //       data: createUserData,
  //       message: 'created!'
  //     })
  //   } catch (error) {
  //     next(error)
  //   }
  // }
}

export default UsersController;