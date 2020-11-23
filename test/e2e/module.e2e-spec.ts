import OAuth2Server = require('oauth2-server');
import { Test, TestingModule } from '@nestjs/testing';
import { InternalServerErrorException } from '@nestjs/common';

import { TestModule } from '../src/test.module';
import { TestModelService } from '../src/test-model.service';
import { OAUTH2_SERVER } from '../../lib/oauth2-server.constants';

describe('ExampleModule', () => {
    let module: TestingModule;

    describe('register()', () => {
        beforeEach(async () => {
            module = await Test.createTestingModule({
                imports: [TestModule.withForRoot()],
                providers: [TestModelService],
            }).compile();
        });

        it('should be defined', () => {
            expect(
                module.get<OAuth2Server>(OAUTH2_SERVER),
            ).toBeDefined();
        });
    });

    describe('register() to throw when no model is provided', () => {
        it('should be throw if now model provided', () => {
            return Test.createTestingModule({
                imports: [TestModule.withForRoot()],
            })
                .compile()
                .catch(error =>
                    expect(error).toBeInstanceOf(
                        InternalServerErrorException,
                    ),
                );
        });
    });

    describe('registerAsync()', () => {
        describe('useFactory()', () => {
            it('should register module', async () => {
                module = await Test.createTestingModule({
                    imports: [
                        TestModule.withUseFactoryForRootAsync(),
                    ],
                    providers: [TestModelService],
                }).compile();

                expect(
                    module.get<OAuth2Server>(OAUTH2_SERVER),
                ).toBeDefined();
            });
        });

        describe('useClass()', () => {
            it('should register module', async () => {
                module = await Test.createTestingModule({
                    imports: [TestModule.withUseClassForRootAsync()],
                    providers: [TestModelService],
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
                        TestModule.withUseExistingForRootAsync(),
                    ],
                    providers: [TestModelService],
                }).compile();

                expect(
                    module.get<OAuth2Server>(OAUTH2_SERVER),
                ).toBeDefined();
            });
        });
    });
});
