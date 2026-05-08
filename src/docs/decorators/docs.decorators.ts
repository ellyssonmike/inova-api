import {
  DOCS_METADATA_KEY,
  SWAGGER_RESPONSE_DECORATOR,
} from '@docs/docs.metadata';
import { SetMetadata } from '@nestjs/common';
import { ControllerSchema, DecoratorFunction } from '@docs/docs.interfaces';

export function SwaggerResponse(decorator: DecoratorFunction) {
  return SetMetadata(SWAGGER_RESPONSE_DECORATOR, decorator);
}

export function Docs(schema: ControllerSchema) {
  return (target: any, key?: string, descriptor?: PropertyDescriptor) => {
    const method = descriptor?.value ?? target;
    const metadata = Reflect.getMetadata(DOCS_METADATA_KEY, method);

    Reflect.defineMetadata(DOCS_METADATA_KEY, { schema, ...metadata }, method);
  };
}

export function Authenticated() {
  return (target: any, key?: string, descriptor?: PropertyDescriptor) => {
    const method = descriptor?.value ?? target;
    const metadata = Reflect.getMetadata(DOCS_METADATA_KEY, method) ?? {};

    Reflect.defineMetadata(
      DOCS_METADATA_KEY,
      { authenticated: true, ...metadata },
      method,
    );
  };
}

export function Paginated() {
  return (target: unknown, key?: string, descriptor?: PropertyDescriptor) => {
    const method = descriptor?.value ?? target;
    const metadata = Reflect.getMetadata(DOCS_METADATA_KEY, method);

    Reflect.defineMetadata(
      DOCS_METADATA_KEY,
      { paginated: true, ...metadata },
      method,
    );
  };
}
