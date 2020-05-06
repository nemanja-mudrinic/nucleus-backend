import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '../../../utils/enums';

interface BasePayload {
  exception?: string;
}

export interface DefaultErrorPayload extends BasePayload {
  message: string;
}

export interface FieldErrorPayload extends BasePayload {
  field: string;
  message: string;
}

export interface FormFieldsErrorPayload extends BasePayload {
  fields: FieldErrorPayload[];
}

export interface InvalidFormLogicErrorPayload extends BasePayload {
  formMessage?: string;
  fields?: FieldErrorPayload[];
}

export class ErrorResponse {
  httpStatus: HttpStatus;
  errorCode: ErrorCode;
  payload:
    | DefaultErrorPayload
    | FieldErrorPayload
    | FormFieldsErrorPayload
    | InvalidFormLogicErrorPayload;
  exception?: string;
}
