import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

export const filterMethods = (methodName: string) => {
  return methodName !== 'constructor';
};

export const mapMethods = (prototype: unknown) => (methodName: string) => {
  return prototype[methodName] as InstanceWrapper<unknown>;
};
