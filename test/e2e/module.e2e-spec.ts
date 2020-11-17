import OAuth2Server = require('oauth2-server');
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../src/app.module';
import { OAUTH2_SERVER } from '../../lib/oath2-server.constants';

describe('ExampleModule', () => {
    let module: TestingModule;

    describe('register()', () => {
        beforeEach(async () => {
            module = await Test.createTestingModule({
                imports: [AppModule.withForRoot()],
            }).compile();
        });

        it('should be defined', () => {
            expect(
                module.get<OAuth2Server>(OAUTH2_SERVER),
            ).toBeDefined();
        });
    });

    describe('registerAsync()', () => {
        describe('useFactory()', () => {
            it('should register module', async () => {
                module = await Test.createTestingModule({
                    imports: [AppModule.withUseFactoryForRootAsync()],
                }).compile();

                expect(
                    module.get<OAuth2Server>(OAUTH2_SERVER),
                ).toBeDefined();
            });
        });

        describe('useClass()', () => {
            it('should register module', async () => {
                module = await Test.createTestingModule({
                    imports: [AppModule.withUseClassForRootAsync()],
                }).compile();

                expect(
                    module.get<OAuth2Server>(OAUTH2_SERVER),
                ).toBeDefined();
            });
        });

        describe('useExisting()', () => {
            it('should register module', async () => {
                module = await Test.createTestingModule({
                    imports: [
                        AppModule.withUseExistingForRootAsync(),
                    ],
                }).compile();

                expect(
                    module.get<OAuth2Server>(OAUTH2_SERVER),
                ).toBeDefined();
            });
        });
    });
});
