import { Test } from '@nestjs/testing';
import { when } from 'jest-when';
import * as bcrypt from 'bcrypt';
import Mock = jest.Mock;
import { uuid } from 'uuidv4';

import { AuthService } from '../../services/impl';
import { UserRepository } from '../../../../repositories';
import { IAuthService } from '../../services';
import { TOKEN_SERVICE, USER_SERVICE } from '../../../../utils/constants';
import {
  getUser,
  USER_FIRST_NAME,
  USER_LAST_NAME,
  USER_PASSWORD,
  VALID_USER_EMAIL,
} from '../utils/mock.util';
import { mapToClass } from '../../../../utils/mapper/object.mapper';
import {
  AuthenticateUserRequest,
  RegisterRequest,
} from '../../../../dto/request/user';
import {
  UserNotFoundException,
  UserPasswordNotMatchException,
} from '../../../../exceptions/user';
import { AuthenticateUserResponse } from '../../../../dto/response/user';

const INVALID_EMAIL = 'invalid@test.com';
const ACCESS_TOKEN = 'generatedTestJwt';
const USER_ID = uuid();

describe('AuthService', () => {
  let service: IAuthService;

  const mocks = {
    userRepoFindByEmail: jest.fn(),
    tokenServiceGenerateAccessToken: jest.fn(),
    userServiceCreateUser: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: TOKEN_SERVICE,
          useFactory: () => ({
            generateAccessToken: mocks.tokenServiceGenerateAccessToken,
          }),
        },
        {
          provide: USER_SERVICE,
          useFactory: () => ({
            createUser: mocks.userServiceCreateUser,
          }),
        },
        {
          provide: UserRepository,
          useFactory: () => ({
            findOneByEmail: mocks.userRepoFindByEmail,
          }),
        },
      ],
    }).compile();

    service = moduleRef.get<IAuthService>(AuthService);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('initization tests', () => {
    it('should be defined', () => expect(service).toBeDefined());
  });

  describe('loginUser tests', () => {
    beforeEach(() => {
      /* eslint-disable @typescript-eslint/no-use-before-define */
      defineUserRepoFindByEmailMock(mocks.userRepoFindByEmail);
      defineTokenServiceGeneareteAccessToken(
        mocks.tokenServiceGenerateAccessToken,
      );
      /* eslint-enable @typescript-eslint/no-use-before-define */
    });

    it('should throw UserNotFoundException when user is not found in database', () => {
      const request = mapToClass(
        {
          email: INVALID_EMAIL,
          password: USER_PASSWORD,
        },
        AuthenticateUserRequest,
      );

      expect(service.loginUser(request)).rejects.toThrow(UserNotFoundException);
    });

    it('should throw UserPassswordNotMatchException when password is invalid', () => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      defineBycryptCompare(false);
      const request = mapToClass(
        {
          email: VALID_USER_EMAIL,
          password: USER_PASSWORD,
        },
        AuthenticateUserRequest,
      );

      expect(service.loginUser(request)).rejects.toThrow(
        UserPasswordNotMatchException,
      );
    });

    it('should call TokenService to generate token with user id', async () => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      defineBycryptCompare(true);
      const request = mapToClass(
        {
          email: VALID_USER_EMAIL,
          password: USER_PASSWORD,
        },
        AuthenticateUserRequest,
      );

      await service.loginUser(request);

      expect(mocks.tokenServiceGenerateAccessToken).toHaveBeenCalledWith(
        expect.any(String),
      );
    });

    it('should create UserResponse with user and accessToken', async () => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      defineBycryptCompare(true);
      const request = mapToClass(
        {
          email: VALID_USER_EMAIL,
          password: 'password',
        },
        AuthenticateUserRequest,
      );
      const user = getUser(USER_ID);
      const expected: AuthenticateUserResponse = {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        accessToken: ACCESS_TOKEN,
      };

      const result = await service.loginUser(request);
      expect(JSON.stringify(result)).toEqual(JSON.stringify(expected));
    });
  });

  describe('registerUser tests', () => {
    beforeEach(() => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      defineUserServiceCreateUser(mocks.userServiceCreateUser);
    });

    it('should call UserService to create user', async () => {
      const request = mapToClass(
        {
          firstName: USER_FIRST_NAME,
          lastName: USER_LAST_NAME,
          email: VALID_USER_EMAIL,
          password: USER_PASSWORD,
        },
        RegisterRequest,
      );

      await service.registerUser(request);

      expect(mocks.userServiceCreateUser).toHaveBeenCalled();
    });
  });
});

const defineUserServiceCreateUser = (mockFn: Mock): void => {
  mockFn.mockReturnValue(getUser());
};

const defineTokenServiceGeneareteAccessToken = (mockFn: Mock): void => {
  mockFn.mockReturnValue(ACCESS_TOKEN);
};

const defineUserRepoFindByEmailMock = (mockFn: Mock): void => {
  const user = getUser(USER_ID);

  when(mockFn)
    .calledWith(INVALID_EMAIL)
    .mockReturnValue(null)
    .calledWith(VALID_USER_EMAIL)
    .mockReturnValue(user);
};

const defineBycryptCompare = (isValid: boolean) => {
  const compareMock = jest
    .fn()
    .mockImplementation()
    .mockReturnValue(isValid);
  const bcryptMock = bcrypt;
  bcryptMock.compare = compareMock;
};
