import { Controller, Post } from '@nestjs/common';
import { AuthorizationCode, Token } from 'oauth2-server';

import {
    OAuth2Token,
    OAuth2Authorize,
    OAuth2RenewToken,
    OAuth2Authenticate,
    OAuth2Authorization,
} from '../../lib';
import { of } from 'rxjs';

@Controller()
export class TestController {
    @Post('authenticate')
    @OAuth2Authenticate()
    authenticateClient(@OAuth2Token() token: Token) {
        return of(token);
    }

    @Post('authenticate/null')
    authenticateNullClient(@OAuth2Token() token: Token) {
        return of(token);
    }

    @OAuth2Authorize()
    @Post('authorize')
    authorizeClient(
        @OAuth2Authorization()
        authorization: AuthorizationCode,
    ) {
        return of(authorization);
    }

    @Post('authorize/null')
    authorizeNullClient(
        @OAuth2Authorization()
        authorization: AuthorizationCode,
    ) {
        return of(authorization);
    }

    @Post('renew')
    @OAuth2RenewToken()
    renewToken(@OAuth2Token() token: Token) {
        return of(token);
    }
}
