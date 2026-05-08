import { Module } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import { DocsDiscoveryService } from './services/docs-discovery.service';
import { DocsBuilderService } from './services/docs-builder.service';
import { BasichAuthAuthorizer } from './basic-auth.authorizer';

@Module({
  providers: [
    DiscoveryService,
    DocsDiscoveryService,
    DocsBuilderService,
    BasichAuthAuthorizer,
  ],
})
export class DocsModule {}
