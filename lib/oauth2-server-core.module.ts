import {
    Type,
    Module,
    Global,
    Provider,
    DynamicModule,
} from '@nestjs/common';
import { ServerOptions } from 'oauth2-server';
import OAuth2Server = require('oauth2-server');

import {
    OAuth2ServerAuthorizationGuard,
    OAuth2ServerAuthenticationGuard,
} from './guards';
import {
    OAUTH2_SERVER,
    OAUTH2_SERVER_MODEL,
    OAUTH2_SERVER_OPTIONS_TOKEN,
} from './oath2-server.constants';
import {
    OAuth2ServerModuleOptions,
    OAuth2ServerOptionsFactory,
    OAuth2ServerModuleAsyncOptions,
} from './interfaces/oauth2-server.interfaces';

@Global()
@Module({
    providers: [
        {
            provide: OAUTH2_SERVER,
            useFactory: (
                options: OAuth2ServerModuleOptions,
                model: ServerOptions['model'],
            ): OAuth2Server =>
                new OAuth2Server(
                    Object.assign({}, options, { model }),
                ),
            inject: [
                OAUTH2_SERVER_OPTIONS_TOKEN,
                OAUTH2_SERVER_MODEL,
            ],
        },
        OAuth2ServerAuthorizationGuard,
        OAuth2ServerAuthenticationGuard,
    ],
    exports: [OAUTH2_SERVER],
})
export class OAuth2ServerCoreModule {
    static forRoot(
        options: OAuth2ServerModuleOptions,
        model: Type<any>,
    ): DynamicModule {
        return {
            module: OAuth2ServerCoreModule,
            providers: [
                {
                    provide: OAUTH2_SERVER_OPTIONS_TOKEN,
                    useValue: options,
                },
                {
                    provide: OAUTH2_SERVER_MODEL,
                    useClass: model,
                },
            ],
        };
    }

    static forRootAsync(
        options: OAuth2ServerModuleAsyncOptions,
    ): DynamicModule {
        const { model, ...otherOptions } = options;

        return {
            module: OAuth2ServerCoreModule,
            providers: [
                ...this.createAsyncProviders(otherOptions),
                {
                    provide: OAUTH2_SERVER_MODEL,
                    useClass: model,
                },
            ],
            imports: options.imports || [],
        };
    }

    static createAsyncProviders(
        options: Omit<OAuth2ServerModuleAsyncOptions, 'model'>,
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
        options: Omit<OAuth2ServerModuleAsyncOptions, 'model'>,
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
                factory.createOAuth2ServerOptions(),
            inject,
        };
    }
}
