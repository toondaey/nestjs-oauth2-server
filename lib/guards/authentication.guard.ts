import {
    Token,
    AuthenticateOptions,
    Request as OAuth2Request,
    Response as OAuth2Response,
} from 'oauth2-server';
import { from, Observable } from 'rxjs';
import { Injectable, CanActivate } from '@nestjs/common';

import { BaseGuard } from './base.guard';

@Injectable()
export class OAuth2ServerAuthenticationGuard extends BaseGuard
    implements CanActivate {
    protected action(
        request: OAuth2Request,
        response: OAuth2Response,
        options?: AuthenticateOptions,
    ): Observable<Token> {
        return from(
            this.oauthServer.authenticate(request, response, options),
        );
    }

    protected includeOauthInRequest(
        request: Record<string, any>,
        token: Token,
    ) {
        request.oauth = { token };
    }
}
