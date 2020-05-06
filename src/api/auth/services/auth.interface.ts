import { RegisterRequest } from '../../../dto/request/user';
import { AuthenticateUserRequest } from '../../../dto/request/user';
import { AuthenticateUserResponse } from '../../../dto/response/user';

export interface IAuthService {
  registerUser(registerRequest: RegisterRequest): Promise<void>;

  loginUser(
    authenticateUserRequest: AuthenticateUserRequest,
  ): Promise<AuthenticateUserResponse>;
}
