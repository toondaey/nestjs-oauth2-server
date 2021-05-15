import {
    AuthorizeOptions,
    AuthorizationCode,
    Request as OAuth2Request,
    Response as OAuth2Response,
} from 'oauth2-server';
import { from, Observable } from 'rxjs';
import { Injectable, CanActivate } from '@nestjs/common';

import { BaseGuard } from './base.guard';

@Injectable()
export class OAuth2ServerAuthorizationGuard
    extends BaseGuard
    implements CanActivate {
    protected action(
        request: OAuth2Request,
        response: OAuth2Response,
        options?: AuthorizeOptions,
    ): Observable<AuthorizationCode> {
        return from(
            this.oauthServer.authorize(request, response, options),
        );
    }

    protected includeOauthInRequest(
        request: Record<string, any>,
        authorization: AuthorizationCode,
    ) {
        request.oauth = { authorization };
    }
}
