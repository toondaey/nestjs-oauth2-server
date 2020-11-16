import {
    Type,
    Module,
    Provider,
    DynamicModule,
} from '@nestjs/common';

import {
    OAuth2ServerModuleOptions,
    OAuth2ServerOptionsFactory,
    Oauth2ServerModuleAsyncOptions,
} from './oauth2-server.interfaces';
import { OAUTH2_SERVER_OPTIONS_TOKEN } from './oath2-server.constants';

@Module({})
export class OAuth2ServerModule {
    static register(
        options: OAuth2ServerModuleOptions,
    ): DynamicModule {
        return {
            module: OAuth2ServerModule,
            providers: [
                {
                    provide: OAUTH2_SERVER_OPTIONS_TOKEN,
                    useValue: options,
                },
            ],
        };
    }

    static registerAsync(
        options: Oauth2ServerModuleAsyncOptions,
    ): DynamicModule {
        return {
            module: OAuth2ServerModule,
            providers: [...this.createAsyncProviders(options)],
            imports: options.imports || [],
        };
    }

    static createAsyncProviders(
        options: Oauth2ServerModuleAsyncOptions,
    ): Provider[] {
        if (options.useFactory || options.useExisting) {
            return [this.createAsyncOptionsProvider(options)];
        }

        const useClass = options.useClass as Type<
            OAuth2ServerOptionsFactory
        >;
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: useClass,
                useClass,
            },
        ];
    }

    static createAsyncOptionsProvider(
        options: Oauth2ServerModuleAsyncOptions,
    ): Provider {
        if (options.useFactory) {
            return {
                provide: OAUTH2_SERVER_OPTIONS_TOKEN,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }

        const inject = [
            (options.useClass || options.useExisting) as Type<
                OAuth2ServerOptionsFactory
            >,
        ];

        return {
            provide: OAUTH2_SERVER_OPTIONS_TOKEN,
            useFactory: (factory: OAuth2ServerOptionsFactory) =>
                factory.createPdfOptions(),
            inject,
        };
    }
}
