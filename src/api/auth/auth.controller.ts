import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { RegisterRequest } from '../../dto/request/user';
import { IAuthService } from './services';
import { AUTH_SERVICE } from '../../utils/contants';
import { AuthenticateUserRequest } from '../../dto/request/user';
import { AuthenticateUserResponse } from '../../dto/response/user';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly _authService: IAuthService;

  constructor(@Inject(AUTH_SERVICE) authService: IAuthService) {
    this._authService = authService;
  }

  @ApiResponse({ status: 200, type: AuthenticateUserResponse })
  @HttpCode(200)
  @Post('/login')
  async loginUser(
    @Body() request: AuthenticateUserRequest,
  ): Promise<AuthenticateUserResponse> {
    return this._authService.loginUser(request);
  }

  @ApiResponse({ status: 201 })
  @Post('/register')
  async registerUser(@Body() request: RegisterRequest): Promise<void> {
    return this._authService.registerUser(request);
  }
}
