import { HttpStatus, Type } from '@nestjs/common';
import { HttpExceptionError } from '@infra/common/errors/http-exception.error';
import { ApiResponseNoStatusOptions } from '@nestjs/swagger';

export type ErrorClass = typeof HttpExceptionError;
export type Response = Type<unknown> | [Type<unknown>] | ResponseConfig;

export type DecoratorFunction = (
  options?: ApiResponseNoStatusOptions,
) => MethodDecorator & ClassDecorator;

export interface ControllerSchema {
  summary: string;
  description: string;
  validated: boolean;
  responses: Response[];
}

export interface ResponseData {
  module: string;
  message: string;
  code: string;
  details?: unknown;
  logout?: boolean;
  expiredAt?: Date;
  errors?: [];
}

export interface ContentExampleValue extends ResponseData {
  name: string;
  status: HttpStatus;
}

export interface ResponseConfig {
  name: string;
  type: Type<unknown>;
  data?: ResponseData;
}

export interface GroupedResponseType {
  [key: string]: {
    type: Type<unknown>;
    examples: Array<{
      type: Type<unknown>;
      name: string;
      data: ResponseData;
    }>;
  };
}

export interface DecoratorContentExample {
  [key: string]: {
    value: ContentExampleValue;
  };
}

export interface MethodDecoratedConfig {
  authenticated?: boolean;
  paginated?: boolean;
  schema: ControllerSchema;
}
