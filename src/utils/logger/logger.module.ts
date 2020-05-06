import { Module } from '@nestjs/common';

import { LOGGER_SERVICE } from "../contants";
import { LoggerService } from "./impl";

const LOGGER = {
  provide: LOGGER_SERVICE,
  useClass: LoggerService,
};

@Module({
  providers: [LOGGER],
  exports: [LOGGER],
})
export class LoggerModule {}
