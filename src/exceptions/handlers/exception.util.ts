import { HttpStatus } from '@nestjs/common';

import { ErrorResponse } from '../../dto/response/application';
import { ErrorCode } from '../../utils/enums';
import {
  UserNotFoundException,
  UserPasswordNotMatchException,
  UserAlreadyExistException,
} from '../user';
import {
  ResourceNotFoundException,
  ValidationException,
  UnauthorizedException,
  BaseException,
} from '..';

export const isSpecificError = exception =>
  exception instanceof UserNotFoundException ||
  exception instanceof UserPasswordNotMatchException ||
  exception instanceof UserAlreadyExistException;

export const isGeneralError = exception =>
  exception instanceof ResourceNotFoundException ||
  exception instanceof UnauthorizedException;

export const createSpecificErrorResponse = <T extends BaseException>(
  exception: T,
): ErrorResponse => {
  return {
    httpStatus: exception._httpStatus,
    errorCode: exception._errorCode,
    payload: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      formMessage: exception.getPayload().formMessage || 'Invalid form',
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      fields: exception.getPayload().fields || [],
    },
  };
};

export const createGeneralErrorResponse = <T extends BaseException>(
  exception: T,
): ErrorResponse => {
  return {
    httpStatus: exception._httpStatus,
    errorCode: exception._errorCode,
    payload: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      message: exception.getPayload().message,
    },
  };
};

export const handle404Error = (message: string): ErrorResponse => {
  return {
    httpStatus: HttpStatus.NOT_FOUND,
    errorCode: ErrorCode.GENERAL_ERROR,
    payload: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      message: message,
    },
  };
}

export const createValidationError = (
  exception: ValidationException,
): ErrorResponse => {
  return {
    httpStatus: exception._httpStatus,
    errorCode: exception._errorCode,
    payload: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      fields: exception.getPayload().fields,
    },
  };
};

export const createUnknowError = (): ErrorResponse => {
  return {
    errorCode: ErrorCode.UNKNOWN_ERROR,
    httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
    payload: {
      message: 'Unexpected error, we are working to fix it!',
    },
  };
};
