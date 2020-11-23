import { Type } from '@nestjs/common';
import { ServerOptions } from 'oauth2-server';
import { ModuleMetadata } from '@nestjs/common/interfaces';

export type IOAuth2ServerModuleOptions = Omit<ServerOptions, 'model'>;

export interface IOAuth2ServerOptionsFactory {
    createOAuth2ServerOptions(): IOAuth2ServerModuleOptions;
}

export interface IOAuth2ServerModuleAsyncOptions
    extends Pick<ModuleMetadata, 'imports'> {
    useClass?: Type<IOAuth2ServerOptionsFactory>;
    useExisting?: Type<IOAuth2ServerOptionsFactory>;
    useFactory?: (...args: any[]) => IOAuth2ServerModuleOptions;
    inject?: any[];
}
