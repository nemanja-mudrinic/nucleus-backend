import { HttpStatus } from '@nestjs/common';

import { BaseException } from '../base.exception';
import { ErrorCode } from '../../utils/enums';
import {
  DefaultErrorPayload,
  FieldErrorPayload,
  FormFieldsErrorPayload,
  InvalidFormLogicErrorPayload,
} from '../../dto/response/application/error.response';

export class UserPasswordNotMatchException extends BaseException {
  private readonly _message: string;

  private readonly _field: string = 'password';

  constructor() {
    super(HttpStatus.BAD_REQUEST, ErrorCode.SPECIFIC_ERROR);
    this._message = `Invalid password`;
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
