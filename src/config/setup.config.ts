import { INestApplication } from '@nestjs/common';

import { setupSwagger } from './swagger/swagger';
import {
  RestExceptionHandler,
  ValidationHandler,
} from '../exceptions/handlers';
import { LOGGER_SERVICE } from '../utils/contants';
import { ResponseInterceptor } from '../interceptors';

export function configureApp(app: INestApplication) {
  // setup swagger
  setupSwagger(app);

  const loggerService = app.get(LOGGER_SERVICE);

  app.useGlobalInterceptors(new ResponseInterceptor());

  // setup exception handler
  app.useGlobalFilters(new RestExceptionHandler(loggerService));

  // setup validation
  app.useGlobalPipes(new ValidationHandler());
}
