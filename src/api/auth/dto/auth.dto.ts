import { PickType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class PayloadDto {
  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  public id: number;
}

export class RegisterUserDTO {
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public password: string;
}

export class LoginUserDTO extends PickType(RegisterUserDTO, ['email', 'password'] as const) { }
