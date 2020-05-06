import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';

import { IUserService } from './services';
import { USER_SERVICE, SESSION_ID } from '../../utils/contants';
import { UserResponse } from '../../dto/response/user';

@ApiTags('users')
@ApiHeader({
  name: SESSION_ID,
  description: 'Session id',
})
@Controller('api/users')
export class UserController {
  private readonly _userService: IUserService;

  constructor(@Inject(USER_SERVICE) userService: IUserService) {
    this._userService = userService;
  }

  @Get()
  @ApiResponse({ status: 200, type: UserResponse, isArray: true })
  getAll() {
    return this._userService.findAll();
  }

  @Get('/:id')
  @ApiResponse({ status: 200, type: UserResponse })
  getById(@Param('id') id: string) {
    return this._userService.findById(id);
  }
}
