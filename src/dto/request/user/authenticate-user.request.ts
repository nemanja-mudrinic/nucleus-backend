import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from "class-transformer";

export class AuthenticateUserRequest {
  @ApiProperty()
  @Expose()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @ApiProperty()
  @Expose()
  @MaxLength(255)
  @MinLength(5)
  @IsNotEmpty()
  password: string;
}
