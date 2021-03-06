import { INestApplication } from '@nestjs/common';

import { setupSwagger } from './swagger/swagger';
import {
  RestExceptionHandler,
  ValidationHandler,
} from '../exceptions/handlers';
import { LOGGER_SERVICE, SESSION_ID } from '../utils/constants';
import { ResponseInterceptor } from '../interceptors';

export function configureApp(app: INestApplication) {
  // enable cors
  app.enableCors({
    exposedHeaders: SESSION_ID
  });

  // setup swagger
  setupSwagger(app);

  const loggerService = app.get(LOGGER_SERVICE);

  app.useGlobalInterceptors(new ResponseInterceptor());

  // setup exception handler
  app.useGlobalFilters(new RestExceptionHandler(loggerService));

  // setup validation
  app.useGlobalPipes(new ValidationHandler());
}
