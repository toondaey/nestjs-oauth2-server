import { applyDecorators, UseGuards } from '@nestjs/common';

import { OAuth2ServerAuthorizationGuard } from '../guards';

export const OAuth2Authorize = (): ClassDecorator & MethodDecorator =>
    applyDecorators(UseGuards(OAuth2ServerAuthorizationGuard));
