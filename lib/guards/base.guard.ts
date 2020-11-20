import {
    Token,
    OAuthError,
    TokenOptions,
    AuthorizeOptions,
    AuthorizationCode,
    InvalidScopeError,
    AccessDeniedError,
    InvalidTokenError,
    InvalidGrantError,
    InvalidClientError,
    InvalidRequestError,
    AuthenticateOptions,
    InsufficientScopeError,
    UnauthorizedClientError,
    UnauthorizedRequestError,
    Request as OAuth2Request,
    UnsupportedGrantTypeError,
    Response as OAuth2Response,
    UnsupportedResponseTypeError,
} from 'oauth2-server';
import {
    Inject,
    Injectable,
    HttpException,
    ExecutionContext,
    ForbiddenException,
    BadRequestException,
    UnauthorizedException,
    MethodNotAllowedException,
    InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import OAuth2Server = require('oauth2-server');

import {
    OAUTH2_SERVER,
    OAUTH2_METHOD_OPTIONS_METADATA,
} from '../oath2-server.constants';
import { catchError, mergeMap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

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
        ).pipe(
            catchError((error: OAuthError) => this.throwError(error)),
            mergeMap(
                (
                    tokenOrAuthorizationCode:
                        | AuthorizationCode
                        | Token,
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

    protected getOptions<
        T extends
            | TokenOptions
            | AuthorizeOptions
            | AuthenticateOptions
    >(context: ExecutionContext): T {
        return this.reflector.get<T, symbol>(
            OAUTH2_METHOD_OPTIONS_METADATA,
            context.getHandler(),
        );
    }

    protected throwError(error: OAuthError): Observable<never> {
        let httpError: HttpException;

        switch (true) {
            case error instanceof InvalidGrantError:
            case error instanceof UnauthorizedClientError:
            case error instanceof UnauthorizedRequestError:
                httpError = new UnauthorizedException(error.message);
                break;
            case error instanceof UnsupportedResponseTypeError:
                httpError = new MethodNotAllowedException(
                    error.message,
                );
                break;
            case error instanceof InvalidTokenError:
            case error instanceof InvalidScopeError:
            case error instanceof InvalidClientError:
            case error instanceof InvalidRequestError:
            case error instanceof InsufficientScopeError:
            case error instanceof UnsupportedGrantTypeError:
                httpError = new BadRequestException(error.message);
                break;
            case error instanceof AccessDeniedError:
                httpError = new ForbiddenException(error.message);
                break;
            default:
                httpError = new InternalServerErrorException(
                    error.message,
                );
        }

        return throwError(httpError);
    }

    protected abstract action(
        request: OAuth2Request,
        response: OAuth2Response,
        options?: Parameters<OAuth2Server[keyof OAuth2Server]>[2],
    ): Observable<Token | AuthorizationCode>;

    protected abstract includeOauthInRequest<
        T extends Record<string, any>
    >(
        request: T,
        tokenOrAuthorizationCode: Token | AuthorizationCode,
    ): void;
}
