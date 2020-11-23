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
    OAuth2ServerTokenGuard,
    OAuth2ServerAuthorizationGuard,
    OAuth2ServerAuthenticationGuard,
} from './guards';
import {
    OAUTH2_SERVER,
    OAUTH2_SERVER_MODEL_PROVIDER,
    OAUTH2_SERVER_OPTIONS_TOKEN,
} from './oauth2-server.constants';
import {
    IOAuth2ServerModuleOptions,
    IOAuth2ServerOptionsFactory,
    IOAuth2ServerModuleAsyncOptions,
} from './interfaces/oauth2-server.interfaces';
import { ModelProviderModule } from './model-provider.module';

@Global()
@Module({
    imports: [ModelProviderModule],
    providers: [
        {
            provide: OAUTH2_SERVER,
            useFactory: (
                options: IOAuth2ServerModuleOptions,
                model: ServerOptions['model'],
            ): OAuth2Server =>
                new OAuth2Server(
                    Object.assign({}, options, { model }),
                ),
            inject: [
                OAUTH2_SERVER_OPTIONS_TOKEN,
                OAUTH2_SERVER_MODEL_PROVIDER,
            ],
        },
        OAuth2ServerTokenGuard,
        OAuth2ServerAuthorizationGuard,
        OAuth2ServerAuthenticationGuard,
    ],
    exports: [OAUTH2_SERVER],
})
export class OAuth2ServerCoreModule {
    static forRoot(
        options: IOAuth2ServerModuleOptions,
    ): DynamicModule {
        return {
            module: OAuth2ServerCoreModule,
            providers: [
                {
                    provide: OAUTH2_SERVER_OPTIONS_TOKEN,
                    useValue: options,
                },
            ],
        };
    }

    static forRootAsync(
        options: IOAuth2ServerModuleAsyncOptions,
    ): DynamicModule {
        return {
            module: OAuth2ServerCoreModule,
            providers: [...this.createAsyncProviders(options)],
            imports: options.imports || [],
        };
    }

    private static createAsyncProviders(
        options: Omit<IOAuth2ServerModuleAsyncOptions, 'model'>,
    ): Provider[] {
        if (options.useFactory || options.useExisting) {
            return [this.createAsyncOptionsProvider(options)];
        }

        const useClass = options.useClass as Type<
            IOAuth2ServerOptionsFactory
        >;

        return [this.createAsyncOptionsProvider(options), useClass];
    }

    private static createAsyncOptionsProvider(
        options: Omit<IOAuth2ServerModuleAsyncOptions, 'model'>,
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
                IOAuth2ServerOptionsFactory
            >,
        ];

        return {
            provide: OAUTH2_SERVER_OPTIONS_TOKEN,
            useFactory: (factory: IOAuth2ServerOptionsFactory) =>
                factory.createOAuth2ServerOptions(),
            inject,
        };
    }
}
