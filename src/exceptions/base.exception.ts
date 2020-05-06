import { HttpException, HttpStatus } from '@nestjs/common';

import { ErrorCode } from '../utils/enums';
import {
  DefaultErrorPayload,
  FieldErrorPayload,
  FormFieldsErrorPayload,
  InvalidFormLogicErrorPayload,
} from '../dto/response/application/error.response';

export abstract class BaseException extends HttpException {
  _errorCode: ErrorCode;

  _httpStatus: HttpStatus;

  protected constructor(httpStatus: HttpStatus, errorCode: ErrorCode) {
    super('', httpStatus);
    this._httpStatus = httpStatus;
    this._errorCode = errorCode;
  }

  abstract getPayload():
    | DefaultErrorPayload
    | FieldErrorPayload
    | FormFieldsErrorPayload
    | InvalidFormLogicErrorPayload;
}
