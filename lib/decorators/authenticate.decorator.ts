import { applyDecorators, UseGuards } from '@nestjs/common';

import { OAuth2ServerAuthenticationGuard } from '../guards';

export const OAuth2Authenticate = (): ClassDecorator &
    MethodDecorator =>
    applyDecorators(UseGuards(OAuth2ServerAuthenticationGuard));
