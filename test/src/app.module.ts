import { Module, DynamicModule } from '@nestjs/common';

import { ExistingModule } from './existing.module';
import { OAuth2ModelService } from './oauth2-model.service';
import { OAuth2ConfigService } from './oauth2-config.service';
import { OAuth2ServerModule } from '../../lib/oauth2-server.module';

@Module({
    exports: [OAuth2ServerModule],
})
export class AppModule {
    static withForRoot(): DynamicModule {
        return {
            module: AppModule,
            imports: [
                OAuth2ServerModule.forRoot({}, OAuth2ModelService),
            ],
        };
    }

    static withUseFactoryForRootAsync(): DynamicModule {
        return {
            module: AppModule,
            imports: [
                OAuth2ServerModule.forRootAsync({
                    model: OAuth2ModelService,
                    useFactory: () => ({}),
                }),
            ],
        };
    }

    static withUseClassForRootAsync(): DynamicModule {
        return {
            module: AppModule,
            imports: [
                OAuth2ServerModule.forRootAsync({
                    model: OAuth2ModelService,
                    useClass: OAuth2ConfigService,
                }),
            ],
        };
    }

    static withUseExistingForRootAsync(): DynamicModule {
        return {
            module: AppModule,
            imports: [
                OAuth2ServerModule.forRootAsync({
                    model: OAuth2ModelService,
                    useExisting: OAuth2ConfigService,
                    imports: [ExistingModule],
                }),
            ],
        };
    }
}
