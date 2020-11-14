import { Module, DynamicModule } from '@nestjs/common';

import { ExampleModule } from '../../lib/example.module';
import { ExistingModule } from './existing.module';
import { ExampleConfigService } from './example-config.service';

@Module({
    exports: [ExampleModule],
})
export class AppModule {
    static withRegister(): DynamicModule {
        return {
            module: AppModule,
            imports: [ExampleModule.register({})],
        };
    }

    static withUseFactoryRegisterAsync(): DynamicModule {
        return {
            module: AppModule,
            imports: [
                ExampleModule.registerAsync({
                    useFactory: () => ({}),
                }),
            ],
        };
    }

    static withUseClassRegisterAsync(): DynamicModule {
        return {
            module: AppModule,
            imports: [
                ExampleModule.registerAsync({
                    useClass: ExampleConfigService,
                }),
            ],
        };
    }

    static withUseExistingRegisterAsync(): DynamicModule {
        return {
            module: AppModule,
            imports: [
                ExampleModule.registerAsync({
                    useExisting: ExampleConfigService,
                    imports: [ExistingModule],
                }),
            ],
        };
    }
}
