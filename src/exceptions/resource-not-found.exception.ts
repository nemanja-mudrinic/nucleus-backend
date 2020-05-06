import { HttpStatus } from '@nestjs/common';

import { BaseException } from './base.exception';
import { ErrorCode } from '../utils/enums';
import {
  DefaultErrorPayload,
  FieldErrorPayload,
  FormFieldsErrorPayload,
  InvalidFormLogicErrorPayload,
} from '../dto/response/application/error.response';

export class ResourceNotFoundException extends BaseException {
  private readonly _message: string;

  constructor(resource: string, property: string, value: string) {
    super(HttpStatus.BAD_REQUEST, ErrorCode.GENERAL_ERROR);
    this._message = `Resource ${resource} not found by ${property} = ${value}`;
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
