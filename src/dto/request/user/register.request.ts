import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from "class-transformer";

export class RegisterRequest {
  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  firstName: string;

  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  lastName: string;

  @Expose()
  @ApiProperty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @Expose()
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  password: string;
}
