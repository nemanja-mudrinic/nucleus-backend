import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { uuid } from 'uuidv4';

import { ILoggerService } from '../utils/logger';
import { LOGGER_SERVICE } from '../utils/constants';
import { COLERATION_ID, SESSION_ID } from '../utils/constants';
import { UnauthorizedException } from '../exceptions';

const AUTH_ROUTE = 'auth';

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  private readonly _loggerService: ILoggerService;

  constructor(@Inject(LOGGER_SERVICE) loggerService: ILoggerService) {
    this._loggerService = loggerService;
  }

  use(req: Request, res: Response, next: Function): any {
    const requestId = uuid();

    req.headers[COLERATION_ID] = requestId;

    if (!this.isAuthRoute(req)) {
      const sessionId = req.headers[SESSION_ID];
      if (!sessionId) throw new UnauthorizedException();
    }

    next();
  }

  private isAuthRoute({ baseUrl }: Request): boolean {
    return baseUrl.includes(AUTH_ROUTE);
  }
}
