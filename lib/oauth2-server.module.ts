import { Type, Module, DynamicModule } from '@nestjs/common';

import {
    OAuth2ServerModuleOptions,
    OAuth2ServerModuleAsyncOptions,
} from './oauth2-server.interfaces';
import { OAuth2ServerCoreModule } from './oauth2-server-core.module';

@Module({})
export class OAuth2ServerModule {
    static forRoot(
        options: OAuth2ServerModuleOptions,
        model: Type<any>,
    ): DynamicModule {
        return {
            module: OAuth2ServerModule,
            imports: [OAuth2ServerCoreModule.forRoot(options, model)],
        };
    }

    static forRootAsync(
        options: OAuth2ServerModuleAsyncOptions,
    ): DynamicModule {
        return {
            module: OAuth2ServerModule,
            imports: [OAuth2ServerCoreModule.forRootAsync(options)],
        };
    }
}
