import { Test, TestingModule } from '@nestjs/testing';

import { Oauth2ServerService } from '../../lib';
import { AppModule } from '../src/app.module';
import { AppService } from '../src/app.service';

describe('ExampleModule', () => {
    let module: TestingModule;
    let exampleService: Oauth2ServerService;

    describe('register()', () => {
        beforeEach(async () => {
            module = await Test.createTestingModule({
                providers: [AppService],
                imports: [AppModule.withRegister()],
            }).compile();

            exampleService = module.get<Oauth2ServerService>(
                Oauth2ServerService,
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
                    module.get<Oauth2ServerService>(Oauth2ServerService),
                ).toBeDefined();
            });
        });

        describe('useClass()', () => {
            it('should register module', async () => {
                module = await Test.createTestingModule({
                    imports: [AppModule.withUseClassRegisterAsync()],
                }).compile();

                expect(
                    module.get<Oauth2ServerService>(Oauth2ServerService),
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
                    module.get<Oauth2ServerService>(Oauth2ServerService),
                ).toBeDefined();
            });
        });
    });
});
