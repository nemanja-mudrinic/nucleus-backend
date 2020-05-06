import { ArgumentsHost, Catch, ExceptionFilter, Inject } from '@nestjs/common';

import { ILoggerService } from '../../utils/logger';
import {
  EXCEPTION_HANDLER,
  LOGGER_SERVICE,
  COLERATION_ID,
} from '../../utils/contants';
import { ErrorResponse } from '../../dto/response/application';
import {
  createSpecificErrorResponse,
  createGeneralErrorResponse,
  createUnknowError,
  createValidationError,
  isSpecificError,
  isGeneralError,
} from './exception.util';
import { ValidationException } from '../validation.exception';

@Catch()
export class RestExceptionHandler implements ExceptionFilter {
  private readonly _logger: ILoggerService;

  constructor(@Inject(LOGGER_SERVICE) loggerService: ILoggerService) {
    this._logger = loggerService;
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const { url, method } = request;
    const logUrl = `${method} - ${url}`;
    const requestId = request.headers[COLERATION_ID];

    let errorResponse: ErrorResponse;

    if (isSpecificError(exception)) {
      errorResponse = createSpecificErrorResponse(exception);
    } else if (isGeneralError(exception)) {
      errorResponse = createGeneralErrorResponse(exception);
    } else if (exception instanceof ValidationException) {
      errorResponse = createValidationError(exception);
    } else {
      errorResponse = createUnknowError();
    }

    this._logger.error(
      {
        context: `[${EXCEPTION_HANDLER}]`,
        message: JSON.stringify(errorResponse.payload),
        requestId,
        url: logUrl,
      },
      exception,
    );

    response.status(errorResponse.httpStatus).json({
      errorCode: errorResponse.errorCode,
      payload: errorResponse.payload,
    });
  }
}
