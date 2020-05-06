import { Inject, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';

import { IAuthService } from '../auth.interface';
import { RegisterRequest } from '../../../../dto/request/user';
import { TOKEN_SERVICE, USER_SERVICE } from '../../../../utils/constants';
import { AuthenticateUserRequest } from '../../../../dto/request/user';
import {
  AuthenticateUserResponse,
  UserResponse,
} from '../../../../dto/response/user';
import { UserRepository } from '../../../../repositories';
import {
  UserNotFoundException,
  UserPasswordNotMatchException,
} from '../../../../exceptions/user';
import { mapToClass } from '../../../../utils/mapper/object.mapper';
import { IUserService } from '../../../user/services';
import { ITokenService } from '../index';

@Injectable()
export class AuthService implements IAuthService {
  private readonly _userService: IUserService;

  private readonly _tokenService: ITokenService;

  private readonly _userRepository: UserRepository;

  constructor(
    @Inject(USER_SERVICE) userService: IUserService,
    @Inject(TOKEN_SERVICE) tokenService: ITokenService,
    private userRepository: UserRepository,
  ) {
    this._userService = userService;
    this._tokenService = tokenService;
    this._userRepository = userRepository;
  }

  loginUser = async (
    authenticateUserRequest: AuthenticateUserRequest,
  ): Promise<AuthenticateUserResponse> => {
    const { email, password } = authenticateUserRequest;
    const user = await this._userRepository.findOneByEmail(email);

    if (!user) {
      throw new UserNotFoundException(email);
    }

    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      throw new UserPasswordNotMatchException();
    }

    const accessToken = this._tokenService.generateAccessToken(user.id);

    return Promise.resolve(
      mapToClass(
        {
          user: mapToClass(user, UserResponse),
          accessToken,
        },
        AuthenticateUserResponse,
      ),
    );
  };

  registerUser = async (registerRequest: RegisterRequest): Promise<void> => {
    // Feel free to created user
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const createdUser = await this._userService.createUser({
      ...registerRequest,
    });
    // Send email to user
    return Promise.resolve();
  };
}
