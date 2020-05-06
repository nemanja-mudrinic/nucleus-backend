import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { PRIMARY_DATABASE } from '../../utils/constants';
import { UserEntity } from '../../entities';

@Injectable()
class TypeOrmConfig implements TypeOrmOptionsFactory {
  readonly database: string;
  readonly databaseHost: string;
  readonly databasePort: number;
  readonly databaseUsername: string;
  readonly databasePassword: string;

  constructor(private configService: ConfigService) {
    this.database = this.configService.get<string>('database.databaseName');
    this.databaseHost = this.configService.get<string>('database.host');
    this.databasePort = this.configService.get<number>('database.port');
    this.databaseUsername = this.configService.get<string>('database.user');
    this.databasePassword = this.configService.get<string>('database.password');
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      name: PRIMARY_DATABASE,
      type: 'postgres',
      host: this.databaseHost,
      port: this.databasePort,
      username: this.databaseUsername,
      password: this.databasePassword,
      database: this.database,
      synchronize: true,
      entities: [UserEntity],
    };
  }
}

export default TypeOrmConfig;
