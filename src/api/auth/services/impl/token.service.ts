import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign } from 'jsonwebtoken';

import { ITokenService } from '../token.interface';

@Injectable()
export class TokenService implements ITokenService {
  private readonly _jwtSecret: string;

  private readonly _jwtExpire: number;

  constructor(configService: ConfigService) {
    this._jwtExpire = configService.get<number>('security.expire');
    this._jwtSecret = configService.get<string>('security.secret');
  }

  generateAccessToken = (userId: string): string =>
    sign({ userId }, this._jwtSecret, { expiresIn: this._jwtExpire });
}
