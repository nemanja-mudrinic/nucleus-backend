import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import TypeormConfig from './typeorm.config';

const typeOrm = TypeOrmModule.forRootAsync({
  useClass: TypeormConfig,
  inject: [ConfigService],
});

@Module({
  imports: [typeOrm],
  providers: [TypeormConfig],
  exports: [typeOrm],
})
export class DatabaseModule {}
