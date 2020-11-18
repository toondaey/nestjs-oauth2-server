import { Injectable } from '@nestjs/common';

import {
    OAuth2ServerModuleOptions,
    OAuth2ServerOptionsFactory,
} from '../../lib/interfaces/oauth2-server.interfaces';

@Injectable()
export class OAuth2ConfigService
    implements OAuth2ServerOptionsFactory {
    createOAuth2ServerOptions(): OAuth2ServerModuleOptions {
        return {};
    }
}
