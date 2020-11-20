import { Controller, Post, Req } from '@nestjs/common';
import { Token } from 'oauth2-server';

import { OAuth2Token, OAuth2Authenticate } from '../../lib';

@Controller()
export class AppController {
    @Post()
    @OAuth2Authenticate()
    authenticateClient(
        @Req() request: any,
        @OAuth2Token() token: Token,
    ) {
        console.log(token);
        return token;
    }
}
