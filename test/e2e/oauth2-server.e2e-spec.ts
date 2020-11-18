import request = require('supertest');
import { INestApplication } from '@nestjs/common';
import { AppController } from '../src/app.controller';
import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from '../src/app.module';

describe('e2e', () => {
    let module: TestingModule;
    let app: INestApplication;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            controllers: [AppController],
            imports: [AppModule.withForRoot()],
        }).compile();

        app = module.createNestApplication();
        await app.init();
    });

    afterEach(async () => {
        await app.close();
    });

    describe('', () => {
        it('', () => {
            return request(app.getHttpServer())
                .post('/')
                .set(
                    'Authorization',
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
                )
                .expect((response: request.Response) => {
                    // console.log(response.body, response.status);
                });
        });
    });
});
