import { Module, DynamicModule } from '@nestjs/common';

import { ExistingModule } from './existing.module';
import { IOAuth2ServerModuleOptions } from '../../lib';
import { TestConfigService } from './test-config.service';
import { OAuth2ServerModule } from '../../lib/oauth2-server.module';

@Module({})
export class TestModule {
    static withForRoot(): DynamicModule {
        return {
            module: TestModule,
            imports: [
                OAuth2ServerModule.forRoot({
                    allowEmptyState: true,
                }),
            ],
        };
    }

    static withUseFactoryForRootAsync(): DynamicModule {
        return {
            module: TestModule,
            imports: [
                OAuth2ServerModule.forRootAsync({
                    useFactory: (): IOAuth2ServerModuleOptions => ({}),
                }),
            ],
        };
    }

    static withUseClassForRootAsync(): DynamicModule {
        return {
            module: TestModule,
            imports: [
                OAuth2ServerModule.forRootAsync({
                    useClass: TestConfigService,
                }),
            ],
        };
    }

    static withUseExistingForRootAsync(): DynamicModule {
        return {
            module: TestModule,
            imports: [
                OAuth2ServerModule.forRootAsync({
                    useExisting: TestConfigService,
                    imports: [ExistingModule],
                }),
            ],
        };
    }
}
