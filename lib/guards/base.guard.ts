import {
    Token,
    OAuthError,
    TokenOptions,
    AuthorizeOptions,
    AuthorizationCode,
    AuthenticateOptions,
    Request as OAuth2Request,
    Response as OAuth2Response,
} from 'oauth2-server';
import {
    Inject,
    Injectable,
    HttpException,
    ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import OAuth2Server = require('oauth2-server');
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

import {
    OAUTH2_SERVER,
    OAUTH2_METHOD_OPTIONS_METADATA,
} from '../oauth2-server.constants';

@Injectable()
export abstract class BaseGuard {
    @Inject(Reflector) protected readonly reflector!: Reflector;

    @Inject(OAUTH2_SERVER)
    protected readonly oauthServer!: OAuth2Server;

    canActivate(context: ExecutionContext): Observable<boolean> {
        const request = this.getRequest<Record<string, any>>(context);

        return this.action(
            new OAuth2Request(request),
            new OAuth2Response(
                this.getResponse<Record<string, any>>(context),
            ),
            this.getOptions(context),
        ).pipe(
            catchError((error: OAuthError) => this.throwError(error)),
            mergeMap(
                (
                    tokenOrAuthorizationCode:
                        | Token
                        | AuthorizationCode,
                ) => {
                    this.includeOauthInRequest(
                        request,
                        tokenOrAuthorizationCode,
                    );
                    return of(true);
                },
            ),
        );
    }

    protected getRequest<T>(context: ExecutionContext): T {
        return context.switchToHttp().getRequest<T>();
    }

    protected getResponse<T>(context: ExecutionContext): T {
        return context.switchToHttp().getResponse<T>();
    }

    private getOptions<
        T extends
            | TokenOptions
            | AuthorizeOptions
            | AuthenticateOptions,
    >(context: ExecutionContext): T {
        return this.reflector.get<T, symbol>(
            OAUTH2_METHOD_OPTIONS_METADATA,
            context.getHandler(),
        );
    }

    protected throwError(error: OAuthError): Observable<never> {
        return throwError(
            new HttpException(error.message, error.code),
        );
    }

    protected abstract action(
        request: OAuth2Request,
        response: OAuth2Response,
        options?: Parameters<OAuth2Server[keyof OAuth2Server]>[2],
    ): Observable<Token | AuthorizationCode>;

    protected abstract includeOauthInRequest<
        T extends Record<string, any>,
    >(
        request: T,
        tokenOrAuthorizationCode: Token | AuthorizationCode,
    ): void;
}
