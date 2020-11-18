import {
    OAuthError,
    AuthorizeOptions,
    AuthorizationCode,
    UnauthorizedRequestError,
    Request as OAuth2Request,
    Response as OAuth2Response,
} from 'oauth2-server';
import {
    Inject,
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
    InternalServerErrorException,
} from '@nestjs/common';
import OAuth2Server = require('oauth2-server');
import { catchError, mergeMap } from 'rxjs/operators';
import { from, Observable, of, throwError } from 'rxjs';

import { BaseGuard } from './base.guard';
import { OAUTH2_SERVER } from '../oath2-server.constants';

@Injectable()
export class OAuth2ServerAuthorizationGuard extends BaseGuard
    implements CanActivate {
    constructor(
        @Inject(OAUTH2_SERVER)
        oauthServer: OAuth2Server,
    ) {
        super(oauthServer);
    }

    canActivate(context: ExecutionContext): Observable<boolean> {
        const request = this.getRequest<Record<string, any>>(context);
        return this.authorize(
            request,
            this.getResponse(context),
        ).pipe(
            catchError((err: OAuthError) => {
                return throwError(
                    err instanceof UnauthorizedRequestError
                        ? new UnauthorizedException(err.message)
                        : new InternalServerErrorException(
                              err.message,
                          ),
                );
            }),
            mergeMap((authorization: AuthorizationCode) => {
                request.oauth = { authorization };
                return of(true);
            }),
        );
    }

    private authorize<TRequest = any, TResponse = any>(
        request: TRequest,
        response: TResponse,
        options?: AuthorizeOptions,
    ): Observable<AuthorizationCode> {
        const oauth2Request = new OAuth2Request(request);
        const oauth2Response = new OAuth2Response(response);

        return from(
            this.oauthServer.authorize(
                oauth2Request,
                oauth2Response,
                options,
            ),
        );
    }
}
