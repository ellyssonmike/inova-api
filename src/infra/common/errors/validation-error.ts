interface ValidationErrorOptions {
  error?: string;
  module?: string;
  message: string;
  statusCode?: number;
  code?: string;
  details?: any;
  errors?: ValidationErrorReason[];
}

export interface ValidationErrorReason {
  property: string;
  value?: any;
  messages: string[];
}

export class ValidationError {
  public error = 'Validation error';
  public module?: string;
  public code?: string;
  public message: string;
  public statusCode: number;
  public details?: any;
  public errors?: ValidationErrorReason[];

  constructor(options: ValidationErrorOptions) {
    this.error = options.error ?? this.error;
    this.module = options.module;
    this.code = options.code;
    this.message = options.message;
    this.statusCode = options.statusCode ?? 422;
    this.details = options.details;
    this.errors = options.errors;
  }
}
