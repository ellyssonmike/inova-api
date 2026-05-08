import { SetMetadata } from '@nestjs/common';
import { ApiResponseNoStatusOptions } from '@nestjs/swagger';

type DecoratorFunction = (
  options?: ApiResponseNoStatusOptions,
) => MethodDecorator & ClassDecorator;

export const SWAGGER_RESPONSE_DECORATOR = Symbol('SWAGGER_RESPONSE_DECORATOR');

export function SwaggerResponse(decorator: DecoratorFunction) {
  return SetMetadata(SWAGGER_RESPONSE_DECORATOR, decorator);
}
