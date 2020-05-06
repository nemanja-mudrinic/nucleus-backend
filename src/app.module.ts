import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import appConfiguration from './config/application.config';
import { DatabaseModule } from './config/database';
import { UserModule } from './api/user';
import { AuthModule } from './api/auth';
import { LoggerModule } from './utils/logger';
import { RequestMiddleware, MorganMiddleware } from './middlewares';

const CONFIG_MODULES = [
  ConfigModule.forRoot({
    isGlobal: true,
    load: [appConfiguration],
  }),
  DatabaseModule,
  LoggerModule,
];

const API_MODULES = [AuthModule, UserModule];

@Module({
  imports: [...CONFIG_MODULES, ...API_MODULES],
  exports: [...CONFIG_MODULES],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestMiddleware, MorganMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
