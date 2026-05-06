interface ApplicationErrorOptions {
  error?: string;
  module?: string;
  code?: string;
  message: string;
  statusCode?: number;
  errors?: ApplicationError[];
  details?: any;
}

export class ApplicationError {
  public error = 'Application error';
  public module?: string;
  public code?: string;
  public message: string;
  public statusCode: number;
  public errors?: ApplicationError[];
  public details?: any;

  constructor(options: ApplicationErrorOptions) {
    this.error = options.error ?? this.error;
    this.module = options.module;
    this.code = options.code;
    this.message = options.message;
    this.statusCode = options.statusCode ?? 500;
    this.errors = options.errors;
    this.details = options.details;
  }
}
