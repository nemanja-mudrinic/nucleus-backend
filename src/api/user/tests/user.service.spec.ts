import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { when } from 'jest-when';
import Mock = jest.Mock;

import { IUserService } from '../services/user.interface';
import { UserRepository } from '../../../repositories';
import { UserService } from '../services/impl';
import { getUser } from '../../auth/tests/utils/mock.util';

const SALT = 10;

describe('UserService', () => {
  let service: IUserService;

  const configMock = jest.fn();

  const mocks = {
    userRepoFind: jest.fn(),
    userRepoFindOneOrFail: jest.fn(),
    userFindOneByEmail: jest.fn(),
  };

  beforeAll(async () => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    defineConfigMockValues(configMock);
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useFactory: () => ({
            find: mocks.userRepoFind,
            findOneOrFail: mocks.userRepoFindOneOrFail,
            findOneByEmail: mocks.userFindOneByEmail,
          }),
        },
        {
          provide: ConfigService,
          useValue: {
            get: value => configMock(value),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<IUserService>(UserService);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('initization tests', () => {
    it('should be defined', () => expect(service).toBeDefined());
  });

  // TODO: Add more tests
  describe('findAll tests', () => {
    beforeEach(() => {
      /* eslint-disable @typescript-eslint/no-use-before-define */
      defineUserRepoFindMock(mocks.userRepoFind);
      /* eslint-enable @typescript-eslint/no-use-before-define */
    });
    it('should call UserRepository find method', () => {
      service.findAll();

      expect(mocks.userRepoFind).toHaveBeenCalled();
    });
  });

  describe('findById tests', () => {
    // TODO: Add more tests
  });

  describe('createUser tests', () => {
    // TODO: Add more tests
  });
});

const defineUserRepoFindMock = (mockFn: Mock) => {
  mockFn.mockResolvedValue([getUser(), getUser()]);
};

const defineConfigMockValues = (mockFn: Function) => {
  when(mockFn)
    .calledWith('security.salt')
    .mockReturnValue(SALT);
};
