import { Type } from '@nestjs/common';
import { ServerOptions } from 'oauth2-server';
import { ModuleMetadata } from '@nestjs/common/interfaces';

export type OAuth2ServerModuleOptions = Exclude<
    ServerOptions,
    'model'
>;

export interface OAuth2ServerOptionsFactory {
    createPdfOptions(): OAuth2ServerModuleOptions;
}

export interface Oauth2ServerModuleAsyncOptions
    extends Pick<ModuleMetadata, 'imports'> {
    useClass?: Type<OAuth2ServerOptionsFactory>;
    useExisting?: Type<OAuth2ServerOptionsFactory>;
    useFactory?: (...args: any[]) => OAuth2ServerModuleOptions;
    inject?: any[];
}
