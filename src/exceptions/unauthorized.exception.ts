import { HttpStatus } from '@nestjs/common';

import { BaseException } from './base.exception';
import { ErrorCode } from '../utils/enums';
import {
  DefaultErrorPayload,
  FieldErrorPayload,
  FormFieldsErrorPayload,
  InvalidFormLogicErrorPayload,
} from '../dto/response/application/error.response';

export class UnauthorizedException extends BaseException {
  private readonly _message: string;

  constructor() {
    super(HttpStatus.UNAUTHORIZED, ErrorCode.GENERAL_ERROR);
    this._message = `Unauthorized`;
  }

  public getPayload():
    | DefaultErrorPayload
    | FieldErrorPayload
    | FormFieldsErrorPayload
    | InvalidFormLogicErrorPayload {
    return {
      message: this._message,
    };
  }
}
