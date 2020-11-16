import { Inject, Injectable } from '@nestjs/common';

import { OAuth2ServerModuleOptions } from './oauth2-server.interfaces';
import { OAUTH2_SERVER_OPTIONS_TOKEN } from './oath2-server.constants';

@Injectable()
export class OAuth2ServerService {
    constructor(
        @Inject(OAUTH2_SERVER_OPTIONS_TOKEN)
        private readonly moduleOptions: OAuth2ServerModuleOptions,
    ) {}

    // Class methods and properties...
}
