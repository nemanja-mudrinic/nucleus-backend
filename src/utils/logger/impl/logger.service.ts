import { Injectable, Scope } from '@nestjs/common';
import * as Winston from 'winston';
import Chalk from 'chalk';

import { ILoggerService } from '../logger.interface';
import { LogModel } from '../log.model';
import { TransformableInfo } from 'logform';

const { combine, timestamp, label, printf, metadata } = Winston.format;

/**
 * This service will be avalible across whole app
 * This is the place where you can define your own log message format
 * @author mudrinic
 */
@Injectable({
  scope: Scope.DEFAULT,
})
export class LoggerService implements ILoggerService {
  private readonly _logger: Winston.Logger;

  constructor() {
    this._logger = Winston.createLogger({
      levels: Winston.config.npm.levels,
      format: Winston.format.json(),
      level: 'info',
      transports: [
        new Winston.transports.Console({
          format: combine(
            metadata(),
            label(),
            timestamp(),
            printf(
              (message: TransformableInfo) =>
                `${Chalk.cyan(message.timestamp)} [NucleusApp] ${Chalk[
                  LoggerService.getColor(message.level)
                ](message.level)}: ${message.message}`,
            ),
          ),
        }),
      ],
    });
  }

  info(infoLog: LogModel): void {
    this._logger.info(
      `${infoLog.context} - ${infoLog.url} - [${infoLog.requestId}] : ${infoLog.message}`,
      {
        context: infoLog.context,
      },
    );
  }

  warn(infoLog: LogModel): void {
    this._logger.warn(
      `${infoLog.context} - ${infoLog.url} - [${infoLog.requestId}] : ${infoLog.message}`,
      {
        context: infoLog.context,
      },
    );
  }

  error(errorLog: LogModel, error: Error): void {
    this._logger.error(
      `${errorLog.context} - ${errorLog.url} - [${errorLog.requestId}] : ${error.message} - ${error.stack}`,
    );
  }

  private static getColor(level) {
    switch (level) {
      case 'info':
        return 'blue';
      case 'error':
        return 'red';
      case 'warn':
        return 'yellow';
      default:
        return 'blueBright';
    }
  }
}
