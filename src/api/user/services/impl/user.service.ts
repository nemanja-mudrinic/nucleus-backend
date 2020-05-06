import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

import { IUserService } from '../user.interface';
import { UserRepository } from '../../../../repositories';
import { CreateUserModel } from '../../../../dto/internal/user';
import { UserEntity } from '../../../../entities';
import { UserModel } from '../../../../dto/internal/user';
import { mapToClass } from '../../../../utils/mapper/object.mapper';
import { UserResponse } from '../../../../dto/response/user';
import { UserAlreadyExistException } from '../../../../exceptions/user';
import { ResourceNotFoundException } from '../../../../exceptions';

@Injectable()
export class UserService implements IUserService {
  private readonly _userRepository: UserRepository;

  private readonly _salt: number;

  constructor(configService: ConfigService, userRepository: UserRepository) {
    this._salt = configService.get<number>('security.salt');
    this._userRepository = userRepository;
  }

  findAll = (): Promise<UserResponse[]> =>
    this._userRepository
      .find()
      .then(users => users.map(user => mapToClass(user, UserResponse)));

  findById = (id: string): Promise<UserResponse> =>
    this._userRepository
      .findOneOrFail(id)
      .then(user => mapToClass(user, UserResponse))
      .catch(() => {
        throw new ResourceNotFoundException('User', 'id', id);
      });

  createUser = async (createUserModel: CreateUserModel): Promise<UserModel> => {
    const { email, password, firstName, lastName } = createUserModel;
    let user = await this._userRepository.findOneByEmail(email);

    if (user) {
      throw new UserAlreadyExistException(email);
    }

    const hashPassword = await hash(password, this._salt);

    user = mapToClass(
      {
        email,
        firstName,
        lastName,
        password: hashPassword,
      },
      UserEntity,
    );

    const savedUser = await this._userRepository.save(user);

    return Promise.resolve(mapToClass(savedUser, UserModel));
  };
}
