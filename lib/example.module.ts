import {
    Type,
    Module,
    Provider,
    DynamicModule,
} from '@nestjs/common';

import {
    ExampleModuleOptions,
    ExampleOptionsFactory,
    ExampleModuleAsyncOptions,
} from './example.interfaces';
import { ExampleService } from './example.service';
import { EXAMPLE_OPTIONS_TOKEN } from './example.constants';

@Module({
    providers: [ExampleService],
    exports: [ExampleService],
})
export class ExampleModule {
    static register(options: ExampleModuleOptions): DynamicModule {
        return {
            module: ExampleModule,
            providers: [
                {
                    provide: EXAMPLE_OPTIONS_TOKEN,
                    useValue: options,
                },
            ],
        };
    }

    static registerAsync(
        options: ExampleModuleAsyncOptions,
    ): DynamicModule {
        return {
            module: ExampleModule,
            providers: [...this.createAsyncProviders(options)],
            imports: options.imports || [],
        };
    }

    static createAsyncProviders(
        options: ExampleModuleAsyncOptions,
    ): Provider[] {
        if (options.useFactory || options.useExisting) {
            return [this.createAsyncOptionsProvider(options)];
        }

        const useClass = options.useClass as Type<
            ExampleOptionsFactory
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
        options: ExampleModuleAsyncOptions,
    ): Provider {
        if (options.useFactory) {
            return {
                provide: EXAMPLE_OPTIONS_TOKEN,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }

        const inject = [
            (options.useClass || options.useExisting) as Type<
                ExampleOptionsFactory
            >,
        ];

        return {
            provide: EXAMPLE_OPTIONS_TOKEN,
            useFactory: (factory: ExampleOptionsFactory) =>
                factory.createPdfOptions(),
            inject,
        };
    }
}
