import {
  applyDecorators,
  HttpStatus,
  Injectable,
  Type,
  UnprocessableEntityException,
} from '@nestjs/common';
import { HttpExceptionError } from '@infra/common/errors/http-exception.error';
import {
  ContentExampleValue,
  DecoratorContentExample,
  Response,
  ResponseConfig,
  ResponseData,
  ErrorClass,
  GroupedResponseType,
} from '@docs/docs.interfaces';
import { SWAGGER_RESPONSE_DECORATOR } from '@docs/docs.metadata';
import { ModelPropertiesAccessor } from '@nestjs/swagger/dist/services/model-properties-accessor';
import { DocsDiscoveryService } from './docs-discovery.service';
import { DECORATORS } from '@nestjs/swagger/dist/constants';
import { Paginated } from '@infra/base/interfaces/pagination';
import { ApiNoContentResponse, ApiOperation } from '@nestjs/swagger';
import { authenticatedErrorResponses } from '@docs/authenticated-error.responses';
import { validationErrorResponses } from '@docs/validation-error.responses';

@Injectable()
export class DocsBuilderService {
  private readonly modelPropertiesAccessor = new ModelPropertiesAccessor();

  constructor(private readonly discovery: DocsDiscoveryService) {}

  public execute() {
    const methods = this.discovery.getObjectOwnProperties();

    for (const [prototype, methodName, descriptor] of methods) {
      const config = this.discovery.getConfig(prototype[methodName]);
      const { schema, authenticated, paginated } = config;
      const { summary, description, validated, responses } = schema;

      const statusCode = this.discovery.getHttpCode(prototype[methodName]);
      const successDecorators = this.resolveSuccessDecorators(
        statusCode,
        responses,
        paginated,
      );

      const baseResponses = validated
        ? [...responses, ...validationErrorResponses]
        : responses;

      const errorDecorators = this.resolveErrorDecorators(
        authenticated
          ? [...baseResponses, ...authenticatedErrorResponses]
          : baseResponses,
      );

      applyDecorators(
        ApiOperation({ summary, description }),
        ...successDecorators,
        ...errorDecorators,
      )(prototype, methodName, descriptor);
    }
  }

  private isErrorResponse(type: Type<unknown>) {
    return (
      type.prototype instanceof HttpExceptionError ||
      type.prototype instanceof UnprocessableEntityException
    );
  }

  private resolveSuccessDecorators(
    statusCode: HttpStatus,
    responses: Response[],
    paginated?: boolean,
  ) {
    const successResponses = responses.filter((response) => {
      const type = this.resolveResponseType(response);

      return !this.isErrorResponse(type);
    });

    const decorators = successResponses.map((response) => {
      const type = this.resolveResponseType(response);
      const decorator = this.getSwaggerDecorator(type);

      return decorator({
        type: paginated ? Paginated(type) : type,
        isArray: Array.isArray(response),
      });
    });

    if (this.isStatusNoContent(statusCode)) {
      return [ApiNoContentResponse()];
    }

    return decorators;
  }

  private resolveErrorDecorators(responses: Response[]) {
    const errorResponses = responses.filter((response) => {
      const type = this.resolveResponseType(response);

      return this.isErrorResponse(type);
    });

    const groupedErrorTypes = errorResponses.reduce((grouped, response) => {
      const type = this.resolveResponseType(response);
      const status = (type as ErrorClass).status;

      if (this.isConfigResponse(response)) {
        if (!grouped[status]) {
          grouped[status] = {
            type,
            examples: [],
          };
        }

        grouped[status].examples.push({
          type,
          name: response.name,
          data: response.data,
        });
      }

      return grouped;
    }, {} as GroupedResponseType);

    return Object.entries(groupedErrorTypes).map(([, { type, examples }]) => {
      const decorator = this.getSwaggerDecorator(type);
      const firstExample = examples?.[0];

      return decorator({
        ...(examples.length == 1 && {
          type,
          ...(firstExample.data && {
            example: {
              name: firstExample.type.name,
              module: firstExample.data.module,
              code: firstExample.data.code,
              message: firstExample.data.message,
              status: (type as ErrorClass).status,
              ...firstExample.data,
            },
          }),
        }),
        ...(examples.length > 1 && {
          content: {
            'application/json': {
              examples: examples.reduce((acc, { type, name, data }) => {
                acc[name] = { value: this.resolveExampleValue(type, data) };

                return acc;
              }, {} as DecoratorContentExample),
            },
          },
        }),
      });
    });
  }

  private resolveExampleValue(type: Type<unknown>, data: ResponseData) {
    if (!data) {
      return this.generateExample(type);
    }

    const { module, message, code, ...rest } = data;

    return {
      name: type.name,
      module,
      code,
      message,
      status: (type as ErrorClass).status,
      ...rest,
    };
  }

  private resolveResponseType(response: Response) {
    if (this.isConfigResponse(response)) {
      return response.type;
    } else if (Array.isArray(response)) {
      return response[0];
    }

    return response;
  }

  private getSwaggerDecorator(type: Type<unknown>) {
    return Reflect.getMetadata(SWAGGER_RESPONSE_DECORATOR, type);
  }

  private isConfigResponse(response: Response): response is ResponseConfig {
    return (
      typeof response === 'object' &&
      !Array.isArray(response) &&
      'type' in response
    );
  }

  private generateExample(type: Type<unknown>) {
    const properties = this.modelPropertiesAccessor.getModelProperties(
      type.prototype,
    );
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

  private isStatusNoContent(statusCode: HttpStatus) {
    return statusCode === HttpStatus.NO_CONTENT;
  }
}
