import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from '../../repositories';
import { UserController } from './user.controller';
import { UserService } from './services/impl';
import { USER_SERVICE } from '../../utils/contants';

const SERVICES = [
  {
    provide: USER_SERVICE,
    useClass: UserService,
  },
];

const DAL = [TypeOrmModule.forFeature([UserRepository])];

@Module({
  imports: [...DAL],
  providers: [...SERVICES],
  controllers: [UserController],
  exports: [...SERVICES, ...DAL],
})
export class UserModule {}
