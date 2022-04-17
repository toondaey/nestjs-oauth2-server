import request = require('supertest');
import { Test, TestingModule } from '@nestjs/testing';
import { TestController } from '../src/test.controller';
import { HttpStatus, INestApplication } from '@nestjs/common';

import { TestModule } from '../src/test.module';
import { TestModelService } from '../src/test-model.service';
import { ITestExpectedResponses } from '../src/test.interfaces';
import { DataProviderModule } from '../src/data-provider.module';

describe('e2e', () => {
    let module: TestingModule;
    let app: INestApplication;
    let testResponses: Partial<ITestExpectedResponses>;

    beforeEach(async () => {
        testResponses = {};
        module = await Test.createTestingModule({
            controllers: [TestController],
            imports: [
                TestModule.withUseClassForRootAsync(),
                DataProviderModule.register(testResponses as any),
            ],
            providers: [TestModelService],
        }).compile();

        app = module.createNestApplication();
        await app.init();
    });

    afterEach(async () => {
        await app.close();
    });

    describe('OAuth Authenticate', () => {
        it('authenticate token', () => {
            return request(app.getHttpServer())
                .post('/authenticate')
                .set(
                    'Authorization',
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
                )
                .expect(HttpStatus.CREATED)
                .expect(({ body }: request.Response) => {
                    expect(body).toEqual(
                        expect.objectContaining({
                            accessToken: expect.any(String),
                            accessTokenExpiresAt: expect.any(String),
                            client: {
                                id: expect.anything(),
                                grants: expect.arrayContaining([
                                    'authorization_code',
                                ]),
                                redirectUris: expect.arrayContaining([
                                    'https://example.org',
                                ]),
                            },
                        }),
                    );
                });
        });

        it('unauthorized client(s)', () => {
            return request(app.getHttpServer())
                .post('/authenticate')
                .expect(HttpStatus.UNAUTHORIZED)
                .expect(({ body }: any) => {
                    expect(body.message).toBe(
                        'Unauthorized request: no authentication given',
                    );
                });
        });

        it('unauthorized client(s)', () => {
            return request(app.getHttpServer())
                .post('/authenticate/null')
                .expect(({ body }: any) => {
                    expect(body).toEqual(expect.anything());
                });
        });
    });

    describe('OAuth Authorize', () => {
        it('authorize client', () => {
            return request(app.getHttpServer())
                .post('/authorize')
                .set(
                    'Authorization',
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
                )
                .query({
                    client_id: '12345678',
                    response_type: 'code',
                    state: 'akfhkahflah',
                })
                .expect(HttpStatus.CREATED)
                .expect(({ body }: request.Response) => {
                    expect(body).toEqual({
                        authorizationCode: expect.any(String),
                        expiresAt: expect.any(String),
                        redirectUri: expect.any(String),
                        scope: expect.any(String),
                        client: {
                            id: expect.anything(),
                            grants: expect.arrayContaining([
                                'authorization_code',
                            ]),
                            redirectUris: expect.arrayContaining([
                                'https://example.org',
                            ]),
                        },
                        user: expect.any(Object),
                    });
                });
        });

        it('unauthorized client(s)', () => {
            return request(app.getHttpServer())
                .post('/authorize/null')
                .expect(({ body }: any) => {
                    expect(body).toEqual(expect.anything());
                });
        });
    });

    describe('OAuth Token', () => {
        it('get new token', () => {
            return request(app.getHttpServer())
                .post('/renew')
                .set({
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
                    'Content-Type':
                        'application/x-www-form-urlencoded',
                })
                .send({
                    client_id: '12345678',
                    client_secret: '12345678',
                    grant_type: 'authorization_code',
                    code: 'akefhalfgak',
                    redirect_uri: 'https://example.org',
                })
                .expect(HttpStatus.CREATED)
                .expect(({ body }: request.Response) => {
                    expect(body).toEqual(
                        expect.objectContaining({
                            accessToken: expect.any(String),
                            authorizationCode: expect.any(String),
                            refreshToken: expect.any(String),
                            accessTokenExpiresAt: expect.any(String),
                            refreshTokenExpiresAt: expect.any(String),
                            scope: expect.any(String),
                            client: {
                                id: expect.anything(),
                                grants: expect.arrayContaining([
                                    'authorization_code',
                                ]),
                                redirectUris: expect.arrayContaining([
                                    'https://example.org',
                                ]),
                            },
                        }),
                    );
                });
        });
    });
});
