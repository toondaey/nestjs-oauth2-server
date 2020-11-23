import { Module, DynamicModule } from '@nestjs/common';

import {
    IOAuth2ServerModuleOptions,
    IOAuth2ServerModuleAsyncOptions,
} from './interfaces';
import { OAuth2ServerCoreModule } from './oauth2-server-core.module';

@Module({
    imports: [OAuth2ServerCoreModule],
})
export class OAuth2ServerModule {
    static forRoot(
        options: IOAuth2ServerModuleOptions,
    ): DynamicModule {
        return {
            module: OAuth2ServerModule,
            imports: [OAuth2ServerCoreModule.forRoot(options)],
        };
    }

    static forRootAsync(
        options: IOAuth2ServerModuleAsyncOptions,
    ): DynamicModule {
        return {
            module: OAuth2ServerModule,
            imports: [OAuth2ServerCoreModule.forRootAsync(options)],
        };
    }
}
