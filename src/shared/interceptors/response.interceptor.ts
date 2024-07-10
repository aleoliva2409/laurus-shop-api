import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';

import { Observable, catchError, map, throwError } from 'rxjs';

import { ResponseError, Response } from '../types/interfaces';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((res: unknown) => this.responseHandler(res, context)),
      catchError((err: HttpException) => throwError(() => this.errorHandler(err, context))),
    );
  }

  errorHandler(exception: HttpException, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const resFormat: Response<null> = {
      meta: {
        url: request.url,
        status: false,
        statusCode: exception.getStatus(),
      },
      data: null,
      error: exception.getResponse() as ResponseError,
    };

    if (exception instanceof InternalServerErrorException) {
      resFormat.error = {
        details: exception.getResponse(),
        message: exception.message,
        statusCode: exception.getStatus(),
        error: 'Internal server error',
      };
    }

    response.status(exception.getStatus()).json(resFormat);
  }

  responseHandler(res: any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const statusCode = response.statusCode;

    return {
      meta: {
        url: request.url,
        status: true,
        statusCode,
      },
      data: res,
      error: null,
    };
  }
}
