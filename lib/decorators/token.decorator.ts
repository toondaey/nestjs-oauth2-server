import {
    UseGuards,
    SetMetadata,
    applyDecorators,
    ExecutionContext,
    createParamDecorator,
} from '@nestjs/common';
import { AuthorizeOptions } from 'oauth2-server';

import { OAuth2ServerTokenGuard } from '../guards';
import { OAUTH2_METHOD_OPTIONS_METADATA } from '../oauth2-server.constants';

export const OAuth2RenewToken = (
    options?: AuthorizeOptions,
): ClassDecorator & MethodDecorator =>
    applyDecorators(
        SetMetadata(OAUTH2_METHOD_OPTIONS_METADATA, options),
        UseGuards(OAuth2ServerTokenGuard),
    );

export const OAuth2Token = createParamDecorator(
    (_: unknown, contextOrRequest: ExecutionContext | any) => {
        return typeof contextOrRequest.switchToHttp === 'function'
            ? (contextOrRequest as ExecutionContext)
                  .switchToHttp()
                  .getRequest().oauth?.token
            : contextOrRequest.oauth?.token;
    },
);
