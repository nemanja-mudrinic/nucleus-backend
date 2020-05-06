import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { configureApp } from './config';
import { LOGGER_SERVICE } from './utils/constants';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Setup winston as default logger
  app.useLogger(app.get(LOGGER_SERVICE));
  const configService: ConfigService = app.get(ConfigService);
  const serverPort = configService.get<string>('appPort');
  configureApp(app);

  // TODO env
  await app.listen(serverPort);
}

bootstrap();
