import { ApplicationError } from '../application.error';
import { ValidationExceptionFactory } from '@infra/factories/validation-exception.factory';
import { ValidationError } from 'class-validator';

export const exceptionValidator = (
  errors: ValidationError[],
  property?: string,
) => {
  if (errors?.length) {
    throw new ApplicationError(
      ValidationExceptionFactory(
        errors,
        property,
      ).getResponse() as ApplicationError,
    );
  }
};
