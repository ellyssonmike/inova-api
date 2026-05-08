import { ApiOperation } from '@nestjs/swagger';
import { HttpExceptionError } from '@infra/common/errors/http-exception.error';
import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ModelPropertiesAccessor } from '@nestjs/swagger/dist/services/model-properties-accessor';
import { SWAGGER_RESPONSE_DECORATOR } from './swagger-response.decorator';
import { DECORATORS } from '@nestjs/swagger/dist/constants';

type ErrorClass = typeof HttpExceptionError;

export interface ControllerDoc {
  summary: string;
  description: string;
  responses: DocResponse[];
}

export interface DocResponseExample {
  module: string;
  message: string;
  code: string;
  details?: unknown;
  logout?: boolean;
  expiredAt?: Date;
  errors?: [];
}

export interface ContentExampleValue extends DocResponseExample {
  name: string;
  status: HttpStatus;
}

export interface DocResponseConfig {
  name: string;
  type: Type<unknown>;
  example?: DocResponseExample;
}

export type DocResponse = Type<unknown> | [Type<unknown>] | DocResponseConfig;

export interface GroupedResponseType {
  [key: string]: {
    type: Type<unknown>;
    examples: Array<{
      type: Type<unknown>;
      name: string;
      example: DocResponseExample;
    }>;
  };
}

export interface DecoratorContentExample {
  [key: string]: {
    value: ContentExampleValue;
  };
}

export function Docs({ summary, description, responses }: ControllerDoc) {
  const successDecorators = resolveSuccessDecorators(responses);
  const errorDecorators = resolveErrorDecorators(responses);

  return applyDecorators(
    ApiOperation({ summary, description }),
    ...successDecorators,
    ...errorDecorators,
  );
}

function isErrorResponse(type: Type<unknown>) {
  return type.prototype instanceof HttpExceptionError;
}

function resolveSuccessDecorators(responses: DocResponse[]) {
  const successResponses = responses.filter((response) => {
    const type = resolveResponseType(response);

    return !isErrorResponse(type);
  });

  return successResponses.map((response) => {
    const type = resolveResponseType(response);
    const decorator = getSwaggerDecorator(type);

    return decorator({
      type,
      isArray: Array.isArray(response),
    });
  });
}

function resolveErrorDecorators(responses: DocResponse[]) {
  const errorResponses = responses.filter((response) => {
    const type = resolveResponseType(response);

    return isErrorResponse(type);
  });

  const groupedErrorTypes = errorResponses.reduce((grouped, response) => {
    const type = resolveResponseType(response);
    const status = (type as ErrorClass).status;

    if (isConfigResponse(response)) {
      if (!grouped[status]) {
        grouped[status] = {
          type,
          examples: [],
        };
      }

      grouped[status].examples.push({
        type,
        name: response.name,
        example: response.example,
      });
    }

    return grouped;
  }, {} as GroupedResponseType);

  return Object.entries(groupedErrorTypes).map(([, { type, examples }]) => {
    const decorator = getSwaggerDecorator(type);
    const firstExample = examples?.[0];

    return decorator({
      ...(examples.length == 1 && {
        type,
        ...(firstExample && {
          example: {
            name: firstExample.type.name,
            module: firstExample.example.module,
            code: firstExample.example.code,
            message: firstExample.example.message,
            status: (type as ErrorClass).status,
            ...firstExample,
          },
        }),
      }),
      ...(examples.length > 1 && {
        content: {
          'application/json': {
            examples: examples.reduce((acc, { type, name, example }) => {
              acc[name] = { value: resolveExampleValue(type, example) };

              return acc;
            }, {} as DecoratorContentExample),
          },
        },
      }),
    });
  });
}

function resolveExampleValue(type: Type<unknown>, example: DocResponseExample) {
  if (!example) {
    return generateExample(type);
  }

  const { module, message, code, ...metadata } = example;

  return {
    name: type.name,
    module,
    code,
    message,
    status: (type as ErrorClass).status,
    ...metadata,
  };
}

function resolveResponseType(response: DocResponse) {
  if (isConfigResponse(response)) {
    return response.type;
  } else if (Array.isArray(response)) {
    return response[0];
  }

  return response;
}

function getSwaggerDecorator(type: Type<unknown>) {
  return Reflect.getMetadata(SWAGGER_RESPONSE_DECORATOR, type);
}

function isConfigResponse(
  response: DocResponse,
): response is DocResponseConfig {
  return (
    typeof response === 'object' &&
    !Array.isArray(response) &&
    'type' in response
  );
}

const modelPropertiesAccessor = new ModelPropertiesAccessor();
export function generateExample(type: Type<unknown>) {
  const properties = modelPropertiesAccessor.getModelProperties(type.prototype);
  const example: ContentExampleValue = {} as ContentExampleValue;

  for (const property of properties) {
    const metadata =
      Reflect.getMetadata(
        DECORATORS.API_MODEL_PROPERTIES,
        type.prototype,
        property,
      ) ?? {};

    if (metadata.example !== undefined) {
      example[property] = metadata.example;
      continue;
    }

    if (metadata.enum) {
      example[property] = Object.values(metadata.enum)[0];
      continue;
    }

    const targetType = metadata.type;

    switch (targetType) {
      case String:
        example[property] = 'string';
        break;

      case Number:
        example[property] = 0;
        break;

      case Boolean:
        example[property] = true;
        break;

      case Array:
        example[property] = [];
        break;

      case Object:
        example[property] = {};
        break;

      default:
        example[property] = null;
    }
  }

  example.name = type.name;
  example.status = (type as ErrorClass).status;

  return example;
}
