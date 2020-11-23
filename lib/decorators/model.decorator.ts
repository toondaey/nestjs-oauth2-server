import { SCOPE_OPTIONS_METADATA } from '@nestjs/common/constants';
import { applyDecorators, Scope, SetMetadata } from '@nestjs/common';

import { OAUTH2_SERVER_MODEL } from '../oauth2-server.constants';

export const OAuth2Model = (): ClassDecorator =>
    applyDecorators(
        SetMetadata(SCOPE_OPTIONS_METADATA, { scope: Scope.DEFAULT }),
        SetMetadata(OAUTH2_SERVER_MODEL, {}),
    );
