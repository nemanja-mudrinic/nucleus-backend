import { CreateUserModel } from '../../../dto/internal/user';
import { UserModel } from '../../../dto/internal/user';
import { UserResponse } from '../../../dto/response/user';

export interface IUserService {
  createUser(createUserModel: CreateUserModel): Promise<UserModel>;
  findAll(): Promise<UserResponse[]>;
  findById(id: string): Promise<UserResponse>;
}
