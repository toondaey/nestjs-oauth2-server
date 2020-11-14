import { Test, TestingModule } from '@nestjs/testing';

import { ExampleService } from '../../lib';
import { AppModule } from '../src/app.module';
import { AppService } from '../src/app.service';

describe('ExampleModule', () => {
    let module: TestingModule;
    let exampleService: ExampleService;

    describe('register()', () => {
        beforeEach(async () => {
            module = await Test.createTestingModule({
                providers: [AppService],
                imports: [AppModule.withRegister()],
            }).compile();

            exampleService = module.get<ExampleService>(
                ExampleService,
            );
        });

        it('should be defined', () => {
            expect(exampleService).toBeDefined();
        });
    });

    describe('registerAsync()', () => {
        describe('useFactory()', () => {
            it('should register module', async () => {
                module = await Test.createTestingModule({
                    imports: [
                        AppModule.withUseFactoryRegisterAsync(),
                    ],
                }).compile();

                expect(
                    module.get<ExampleService>(ExampleService),
                ).toBeDefined();
            });
        });

        describe('useClass()', () => {
            it('should register module', async () => {
                module = await Test.createTestingModule({
                    imports: [AppModule.withUseClassRegisterAsync()],
                }).compile();

                expect(
                    module.get<ExampleService>(ExampleService),
                ).toBeDefined();
            });
        });

        describe('useExisting()', () => {
            it('should register module', async () => {
                module = await Test.createTestingModule({
                    imports: [
                        AppModule.withUseExistingRegisterAsync(),
                    ],
                }).compile();

                expect(
                    module.get<ExampleService>(ExampleService),
                ).toBeDefined();
            });
        });
    });
});
