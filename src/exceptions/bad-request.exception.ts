import { HttpStatus } from '@nestjs/common';

import { BaseException } from './base.exception';
import {
  DefaultErrorPayload,
  FieldErrorPayload,
  FormFieldsErrorPayload,
  InvalidFormLogicErrorPayload,
} from '../dto/response/application/error.response';
import { ErrorCode } from '../utils/enums';

export class BadRequestException extends BaseException {
  private readonly _message: string;

  private readonly _exception: string;

  constructor(message: string, error?: Error) {
    super(HttpStatus.BAD_REQUEST, ErrorCode.GENERAL_ERROR);
    this._message = message;
    this._exception = error.message || '';
  }

  getPayload():
    | DefaultErrorPayload
    | FieldErrorPayload
    | FormFieldsErrorPayload
    | InvalidFormLogicErrorPayload {
    return {
      message: this._message,
      exception: this._exception,
    };
  }
}
