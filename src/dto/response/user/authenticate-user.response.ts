import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { UserResponse } from './user.response';

export class AuthenticateUserResponse {
  @ApiProperty()
  @Expose()
  user: UserResponse;

  @ApiProperty()
  @Expose()
  accessToken: string;
}
