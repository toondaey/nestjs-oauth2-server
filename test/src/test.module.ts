import { Module, DynamicModule } from '@nestjs/common';

import { ExistingModule } from './existing.module';
import { TestModelService } from './test-model.service';
import { TestConfigService } from './test-config.service';
import { OAuth2ServerModule } from '../../lib/oauth2-server.module';

@Module({
    exports: [OAuth2ServerModule],
})
export class TestModule {
    static withForRoot(): // responses?: ITestExpectedResponses,
    DynamicModule {
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
                    useFactory: () => ({}),
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
