export interface IBaseErrorOptions {
  module: string;
  message: string;
  code: string;
  details?: any;
}

export interface ValidationErrorReason {
  property: string;
  messages: string[];
}
