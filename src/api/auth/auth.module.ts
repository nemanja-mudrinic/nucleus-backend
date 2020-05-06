import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { UserModule } from '../user';
import { AUTH_SERVICE, TOKEN_SERVICE } from '../../utils/constants';
import { TokenService, AuthService } from './services/impl';

const SERVICES = [
  {
    provide: AUTH_SERVICE,
    useClass: AuthService,
  },
  {
    provide: TOKEN_SERVICE,
    useClass: TokenService,
  },
];

@Module({
  imports: [UserModule],
  providers: [...SERVICES],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
