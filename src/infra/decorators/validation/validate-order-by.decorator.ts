import { registerDecorator, ValidationOptions } from 'class-validator';
import { ValidationArguments } from 'class-validator';
import { PAGINATION_OPTIONS_KEY } from '@infra/pipes/pagination.pipe';

export function ValidateOrderBy(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'ValidateOrderBy',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!value) return true;

          const config = Reflect.getMetadata(
            PAGINATION_OPTIONS_KEY,
            args.object?.constructor,
          );

          const fields = config?.orderFields;

          return fields?.includes(value);
        },
        defaultMessage(args: ValidationArguments) {
          const config = Reflect.getMetadata(
            PAGINATION_OPTIONS_KEY,
            args.object?.constructor,
          );

          const fields = config?.orderFields?.join(', ') || 'Nenhum';

          return (
            (validationOptions?.message &&
              typeof validationOptions.message === 'string' &&
              validationOptions.message) ||
            'Campo de ordenação inválido. Os valores permitidos são: ' + fields
          );
        },
      },
    });
  };
}
