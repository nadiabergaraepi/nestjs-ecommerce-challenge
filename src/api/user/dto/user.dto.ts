import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string; //todo: agregar un minlength y maxlength
}

export class UserDto {
  @Expose()
  public id: number;

  @Expose()
  public email: string;
}
