import { UnprocessableEntityException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

interface ValidationErrorReason {
  property: string;
  messages: string[];
}

export const ValidationExceptionFactory = (
  validationErrors: ValidationError[] = [],
) => {
  const errors: ValidationErrorReason[] = [];

  const buildNestedErrors = (
    error: ValidationError,
    parentProperty: string,
  ) => {
    const property = parentProperty
      ? `${parentProperty}.${error.property}`
      : error.property;

    if (error.constraints) {
      Object.entries(error.constraints).forEach(([, value]) => {
        const errFound = errors.findIndex((err) => err.property === property);

        if (errFound > -1) {
          errors[errFound].messages.push(value);
          return;
        }

        errors.push({
          property: property,
          messages: [value],
        });
      });
    }

    if (error.children && error.children.length > 0) {
      error.children.forEach((child) => {
        buildNestedErrors(child, property);
      });
    }

    return errors;
  };

  validationErrors.forEach((error) => {
    buildNestedErrors(error, '');
  });

  return new UnprocessableEntityException({
    name: 'Validation Error',
    module: getErrorTargetName(validationErrors),
    code: 'IN.REQ-VAL.E-0001',
    message:
      'Não foi possível validar os dados da requisição. Verifique os campos informados e tente novamente.',
    errors,
  });
};

const getErrorTargetName = (errors: ValidationError[]): string => {
  const error = errors[0];
  if (error.children && error.children.length > 0) {
    return getErrorTargetName(error.children);
  }

  return error.target?.constructor.name ?? 'ExceptionError';
};
