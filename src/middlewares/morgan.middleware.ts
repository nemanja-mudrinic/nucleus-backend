import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import * as morgan from 'morgan';
import { Request, Response } from 'express';

import { ILoggerService } from '../utils/logger';
import { LOGGER_SERVICE, REQUEST_MIDDLEWARE } from '../utils/contants';
import { COLERATION_ID } from '../utils/contants';

@Injectable()
export class MorganMiddleware implements NestMiddleware {
  private readonly _loggerService: ILoggerService;

  constructor(@Inject(LOGGER_SERVICE) loggerService: ILoggerService) {
    this._loggerService = loggerService;
  }

  use(req: Request, res: Response, next: () => void): any {
    const requestId = req.headers[COLERATION_ID];
    morgan(
      (tokens: morgan.TokenIndexer, req: Request, res: Response) => {
        return [
          tokens.method(req, res),
          tokens.url(req, res),
          tokens.status(req, res),
          tokens.res(req, res, 'content-length'),
          '-',
          tokens['response-time'](req, res),
          'ms',
        ].join('..');
      },
      {
        stream: {
          write: message => {
            const tokens = message.split('..');
            const url = `${tokens[0]} - ${tokens[1]}`;
            const payload = `Status ${tokens[2]} Response Time ${tokens[5]} ${tokens[6]}`;

            this._loggerService.info({
              context: `[${REQUEST_MIDDLEWARE}]`,
              message: payload,
              // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
              // @ts-ignore
              requestId,
              url,
            });
          },
        },
      },
    )(req, res, next);
  }
}
