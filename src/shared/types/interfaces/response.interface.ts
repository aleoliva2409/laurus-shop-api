import { HttpStatus } from '@nestjs/common';

export interface Response<T> {
  meta: Metadata;
  data: T;
  error?: ResponseError;
}

export interface Metadata {
  status: boolean;
  statusCode: HttpStatus;
  url: string;
}

export interface ResponseError {
  message: string | string[];
  statusCode: HttpStatus;
  error: any;
  details?: any;
}
