import {
    UseGuards,
    SetMetadata,
    applyDecorators,
    ExecutionContext,
    createParamDecorator,
} from '@nestjs/common';
import { AuthorizeOptions } from 'oauth2-server';

import { OAuth2ServerAuthorizationGuard } from '../guards';
import { OAUTH2_METHOD_OPTIONS_METADATA } from '../oauth2-server.constants';

export const OAuth2Authorize = (
    options?: AuthorizeOptions,
): ClassDecorator & MethodDecorator =>
    applyDecorators(
        SetMetadata(OAUTH2_METHOD_OPTIONS_METADATA, options),
        UseGuards(OAuth2ServerAuthorizationGuard),
    );

export const OAuth2Authorization = createParamDecorator(
    (_: unknown, context: ExecutionContext | any) =>
        context.switchToHttp().getRequest().oauth?.authorization,
);
