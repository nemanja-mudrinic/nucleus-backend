import { HttpStatus } from '@nestjs/common';

import { BaseException } from './base.exception';
import { ErrorCode } from '../utils/enums';
import {
  DefaultErrorPayload,
  FieldErrorPayload,
  FormFieldsErrorPayload,
  InvalidFormLogicErrorPayload,
} from '../dto/response/application/error.response';

export class ValidationException extends BaseException {
  private readonly _fields: FieldErrorPayload[];

  constructor(fields: FieldErrorPayload[]) {
    super(HttpStatus.BAD_REQUEST, ErrorCode.FIELD_VALIDATION);
    this._fields = fields;
  }

  public getPayload():
    | DefaultErrorPayload
    | FieldErrorPayload
    | FormFieldsErrorPayload
    | InvalidFormLogicErrorPayload {
    return {
      fields: this._fields,
    };
  }
}
