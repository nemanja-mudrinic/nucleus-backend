import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';

import { SESSION_ID } from '../utils/contants';
import { uuid } from "uuidv4";

const LOGIN_ROUTE = 'auth/login';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const sessionId = request.headers[SESSION_ID];

    const isLoginRoute = this.isLoginRoute(request);

    return next.handle().pipe(
      map(data => {
        if (isLoginRoute) {
          const userId = uuid();
          response.setHeader(SESSION_ID, userId);
        } else {
          response.setHeader(SESSION_ID, sessionId);
        }
        return data;
      }),
    );
  }

  private isLoginRoute({ url }: Request): boolean {
    return url.includes(LOGIN_ROUTE);
  }
}
