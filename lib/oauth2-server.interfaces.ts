import { Type } from '@nestjs/common';
import { ServerOptions } from 'oauth2-server';
import { ModuleMetadata } from '@nestjs/common/interfaces';

export type OAuth2ServerModuleOptions = Omit<ServerOptions, 'model'>;

export interface OAuth2ServerOptionsFactory {
    createOAuthServerOptions(): OAuth2ServerModuleOptions;
}

export interface OAuth2ServerModuleAsyncOptions
    extends Pick<ModuleMetadata, 'imports'> {
    model: Type<any>;
    useClass?: Type<OAuth2ServerOptionsFactory>;
    useExisting?: Type<OAuth2ServerOptionsFactory>;
    useFactory?: (...args: any[]) => OAuth2ServerModuleOptions;
    inject?: any[];
}
