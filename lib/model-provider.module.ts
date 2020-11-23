import {
    Reflector,
    DiscoveryModule,
    DiscoveryService,
} from '@nestjs/core';
import { InternalServerErrorException, Module } from '@nestjs/common';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

import {
    OAUTH2_SERVER_MODEL,
    OAUTH2_SERVER_MODEL_PROVIDER,
} from './oauth2-server.constants';

const NO_MODEL_EXCEPTION = 'OAuth2Model not provided';

@Module({
    imports: [DiscoveryModule],
    providers: [
        {
            provide: OAUTH2_SERVER_MODEL_PROVIDER,
            useFactory: (
                discoverService: DiscoveryService,
                reflector: Reflector,
            ) => {
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

                if (!service) {
                    throw new InternalServerErrorException(
                        NO_MODEL_EXCEPTION,
                    );
                }

                return service.instance;
            },
            inject: [DiscoveryService, Reflector],
        },
    ],
    exports: [OAUTH2_SERVER_MODEL_PROVIDER],
})
export class ModelProviderModule {}
