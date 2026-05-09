import { ValidationError } from '@infra/common/errors/validation.error';

export const validationErrorResponses = [
  {
    name: 'ValidationError',
    type: ValidationError,
    data: {
      module: 'string',
      code: 'IN.REQ-VAL.ERR',
      message:
        'Não foi possível validar os dados da requisição. Verifique os campos informados e tente novamente.',
    },
  },
];
