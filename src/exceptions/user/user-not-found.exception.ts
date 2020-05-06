import { HttpStatus } from '@nestjs/common';

import { BaseException } from '../base.exception';
import { ErrorCode } from '../../utils/enums';
import {
  DefaultErrorPayload,
  FieldErrorPayload,
  FormFieldsErrorPayload,
  InvalidFormLogicErrorPayload,
} from '../../dto/response/application/error.response';

export class UserNotFoundException extends BaseException {
  private readonly _message: string;

  private readonly _field: string;

  constructor(value: string, field = 'email') {
    super(HttpStatus.BAD_REQUEST, ErrorCode.SPECIFIC_ERROR);
    this._field = field;
    this._message = `User with ${value} doesn't exist`;
  }

  public getPayload():
    | DefaultErrorPayload
    | FieldErrorPayload
    | FormFieldsErrorPayload
    | InvalidFormLogicErrorPayload {
    return {
      formMessage: this._message,
      fields: [
        {
          field: this._field,
          message: this._message,
        },
      ],
    };
  }
}
