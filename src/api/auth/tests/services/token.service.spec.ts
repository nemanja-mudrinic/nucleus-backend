import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { when } from 'jest-when';
import { uuid } from 'uuidv4';

import { TokenService } from '../../services/impl';
import { ITokenService } from '../../services';
import * as jsonwebtoken from 'jsonwebtoken';

const JWT_SECRET = 'jwtSecretTest';
const JWT_EXPIRE = 3600;

describe('TokenService', () => {
  let service: ITokenService;

  const configMock = jest.fn();

  beforeAll(async () => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    defineConfigMockValues(configMock);
    const moduleRef = await Test.createTestingModule({
      providers: [
        TokenService,
        {
          provide: ConfigService,
          useValue: {
            get: value => configMock(value),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<ITokenService>(TokenService);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('initization tests', () => {
    it('should be defined', () => expect(service).toBeDefined());
  });

  describe('generateAccessToken tests', () => {
    const USER_ID = uuid();
    const signMock = jest.fn().mockImplementation(() => 'generatedTestJwt');

    beforeEach(() => {
      // TODO: Find better approach
      const jsonwebtokenMock = jsonwebtoken;
      jsonwebtokenMock.sign = signMock;
      // As
      // jest.mock('jsonwebtoken', () => {
      //   sign: signMock
      // })
    });

    it('should call sign method once', () => {
      service.generateAccessToken(USER_ID);

      expect(signMock).toHaveBeenCalledTimes(1);
    });

    it('should pass valid payload to sign method', () => {
      const expected = { userId: USER_ID };

      service.generateAccessToken(USER_ID);

      expect(signMock).toHaveBeenCalledWith(
        expected,
        expect.any(String),
        expect.any(Object),
      );
    });

    it('should use config variables', () => {
      const expectedSecret = JWT_SECRET;
      const expectedOptions = {
        expiresIn: JWT_EXPIRE,
      };

      service.generateAccessToken(USER_ID);

      expect(signMock).toHaveBeenCalledWith(
        expect.any(Object),
        expectedSecret,
        expectedOptions,
      );
    });
  });
});

const defineConfigMockValues = (mockFn: Function) => {
  when(mockFn)
    .calledWith('security.expire')
    .mockReturnValue(JWT_EXPIRE)
    .calledWith('security.secret')
    .mockReturnValue(JWT_SECRET);
};
