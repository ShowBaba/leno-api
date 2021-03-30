/**
 * a DTO is an object that holds the raw data that the 
 * DAO (e.g sequelize)
 * will send to—and receive from—the database.
 * DTOs are objects that conform to data model types
 */
import { IsString, IsEmail, } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public fullname: string;

  @IsString()
  public password: string;
}