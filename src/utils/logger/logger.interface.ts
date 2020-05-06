import { LogModel } from './log.model';

export interface ILoggerService {
  info(infoLog: LogModel): void;

  warn(wanrLog: LogModel): void;

  error(errorLog: LogModel, error: Error): void;
}
