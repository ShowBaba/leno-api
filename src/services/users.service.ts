import bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/users.dto';
import HttpException from '../execptions/HttpException';
import { UserInterface } from '../interfaces/users.interface';
import { getConnection } from 'typeorm';
import { User } from '../dbConfig/entities/User'
import status from 'http-status';
import { isEmpty } from 'class-validator';

class UserService {
  // find all users
  public async findAllUser(): Promise<UserInterface[]> {
    const allUser: UserInterface[] = await getConnection()
      .getRepository(User)
      .createQueryBuilder('user')
      .getMany();
    return allUser
  }

  // find user by id
  public async findUserById(userId: number): Promise<UserInterface> {
    if (isEmpty(userId)) throw new HttpException(status.BAD_REQUEST, 'userId cannot be null!')
    // because type user can be undefined i added an alternate type
    const user: UserInterface | undefined = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.id = :userId', { id: userId })
      .getOne();
    if (!user) throw new HttpException(+status[404], 'User not found!');

    return user;
  }
  // update user

  // delete user data

  // 
}

export default UserService;