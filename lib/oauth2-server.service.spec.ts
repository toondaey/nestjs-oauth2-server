import { Test, TestingModule } from '@nestjs/testing';

import { OAuth2ServerService } from './oauth2-server.service';
import { OAUTH2_SERVER_OPTIONS_TOKEN } from './oath2-server.constants';

describe('Oauth2ServerService', () => {
    let module: TestingModule;
    let oauth2ServerService: OAuth2ServerService;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            providers: [
                OAuth2ServerService,
                {
                    provide: OAUTH2_SERVER_OPTIONS_TOKEN,
                    useValue: jest.fn(),
                },
            ],
        }).compile();

        oauth2ServerService = module.get<OAuth2ServerService>(
            OAuth2ServerService,
        );
    });

    it('should be defined', () => {
        expect(oauth2ServerService).toBeDefined();
    });
});
