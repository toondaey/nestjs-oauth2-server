import {
    Reflector,
    DiscoveryModule,
    DiscoveryService,
} from '@nestjs/core';
import { defer, firstValueFrom, of, throwError } from 'rxjs';
import {
    InternalServerErrorException,
    Module,
    Type,
} from '@nestjs/common';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

import {
    OAUTH2_SERVER_MODEL,
    OAUTH2_SERVER_MODEL_PROVIDER,
} from './oauth2-server.constants';
import { mergeMap } from 'rxjs/operators';
import {
    PasswordModel,
    ExtensionModel,
    RefreshTokenModel,
    AuthorizationCodeModel,
    ClientCredentialsModel,
    RequestAuthenticationModel,
} from 'oauth2-server';

const NO_MODEL_EXCEPTION = 'OAuth2Model not provided';

@Module({
    imports: [DiscoveryModule],
    providers: [
        {
            provide: OAUTH2_SERVER_MODEL_PROVIDER,
            useFactory: (
                discoverService: DiscoveryService,
                reflector: Reflector,
            ): Promise<
                Type<
                    | PasswordModel
                    | ExtensionModel
                    | RefreshTokenModel
                    | AuthorizationCodeModel
                    | ClientCredentialsModel
                    | RequestAuthenticationModel
                >
            > => {
                const getProvider = async () => {
                    const service = discoverService
                        .getProviders()
                        .find(
                            (provider: InstanceWrapper) =>
                                provider.metatype &&
                                reflector.get(
                                    OAUTH2_SERVER_MODEL,
                                    provider.metatype,
                                ),
                        );

                    return service?.instance;
                };

                return firstValueFrom(
                    defer(() => getProvider()).pipe(
                        mergeMap(instance =>
                            instance
                                ? of(instance)
                                : throwError(
                                      () =>
                                          new InternalServerErrorException(
                                              NO_MODEL_EXCEPTION,
                                          ),
                                  ),
                        ),
                    ),
                );
            },
            inject: [DiscoveryService, Reflector],
        },
    ],
    exports: [OAUTH2_SERVER_MODEL_PROVIDER],
})
export class ModelProviderModule {}
