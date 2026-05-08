import { Injectable, Type } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { DOCS_METADATA_KEY } from '@docs/docs.metadata';
import { MethodDecoratedConfig } from '@docs/docs.interfaces';
import { filterMethods, mapMethods } from '@docs/helpers/scan.helpers';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

@Injectable()
export class DocsDiscoveryService {
  constructor(private readonly discovery: DiscoveryService) {}

  public getObjectOwnProperties() {
    const controllers = this.getControllersWithMetadata();

    return controllers.flatMap((controller) => {
      const instance = controller.instance;
      const prototype = Object.getPrototypeOf(instance);

      return Object.getOwnPropertyNames(prototype)
        .filter(filterMethods)
        .map((methodName) => {
          const descriptor = Object.getOwnPropertyDescriptor(
            prototype,
            methodName,
          );

          return [prototype, methodName, descriptor] as [
            Type<unknown>,
            string,
            PropertyDescriptor,
          ];
        });
    });
  }

  private getControllersWithMetadata() {
    const controllers = this.discovery.getControllers();

    return controllers.filter((controller) => {
      const instance = controller.instance;
      const prototype = Object.getPrototypeOf(instance);

      return Object.getOwnPropertyNames(prototype)
        .filter(filterMethods)
        .map(mapMethods(prototype))
        .some((method) => Reflect.hasMetadata(DOCS_METADATA_KEY, method));
    });
  }

  public getConfig(method: InstanceWrapper<unknown>): MethodDecoratedConfig {
    return Reflect.getMetadata(DOCS_METADATA_KEY, method);
  }
}
