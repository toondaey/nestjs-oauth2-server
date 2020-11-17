import { Injectable } from '@nestjs/common';

import {
    OAuth2ServerModuleOptions,
    OAuth2ServerOptionsFactory,
} from '../../lib/oauth2-server.interfaces';

@Injectable()
export class OAuth2ConfigService
    implements OAuth2ServerOptionsFactory {
    createOAuthServerOptions(): OAuth2ServerModuleOptions {
        return {};
    }
}
