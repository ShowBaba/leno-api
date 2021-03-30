import bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/users.dto';
import HttpException from '../execptions/HttpException';
import { UserInterface } from '../interfaces/users.interface';
import { getConnection } from 'typeorm';
import jwt from 'jsonwebtoken';
import { User } from '../dbConfig/entities/User'
import status from 'http-status';
import { isEmpty, isJWT } from 'class-validator';
import { dataStoredInToken, TokenData } from 'src/interfaces/auth.interface';

class AuthService {
  public async signup(userData: CreateUserDto): Promise<UserInterface> {
    if (isEmpty(userData)) throw new HttpException(+status['400'], status['400_MESSAGE']);

    // check if user exist
    console.log('searching user.......')
    const findUser: UserInterface | undefined = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.email = :email', { email: userData.email })
      .getOne();
    if (findUser) throw new HttpException(status.CONFLICT, 'Validation Error',
      [
        {
          field: 'email',
          location: 'body',
          messages: [`Your email ${userData.email} already exists`],
        }
      ])
    // create user
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    console.log('creating')
    const data: UserInterface = {
      ...userData, password: hashedPassword,
    }
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        data
      ])
      .execute();
    return data;
  }

  public async login(userData: UserInterface): Promise<UserInterface> {
    if (isEmpty(userData)) throw new HttpException(400, 'User data cannot be empty!');

    const findUser: UserInterface | undefined= await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.email = :email', { email: userData.email })
      .getOne();

    if (!findUser) throw new HttpException(status.NOT_FOUND, 'Not Found!!',
      [
        {
          field: 'email',
          location: 'body',
          messages: [`User with: email ${userData.email} does not exist!`],
        }
      ]);

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password is incorrect!!');

    const tokenData = this.createToken(findUser);

    return findUser;
  }

  public createToken(user: UserInterface): TokenData {
    const dataStoredInToken: dataStoredInToken = { id: user.id! };
    const secret: string = process.env.JWT_SECRET!;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: jwt.sign(dataStoredInToken, secret, { expiresIn }) }
  }

  
}

export default AuthService;