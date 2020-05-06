import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  SWAGGER_API_CURRENT_VERSION,
  SWAGGER_API_DESCRIPTION,
  SWAGGER_API_NAME,
  SWAGGER_API_ROOT,
} from '../../utils/contants';

export function setupSwagger(app: INestApplication) {
  const swaggerOptions = new DocumentBuilder()
    .setTitle(SWAGGER_API_NAME)
    .setDescription(SWAGGER_API_DESCRIPTION)
    .setVersion(SWAGGER_API_CURRENT_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup(SWAGGER_API_ROOT, app, document);
}
