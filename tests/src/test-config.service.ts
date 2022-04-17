import { Injectable } from '@nestjs/common';

import {
    IOAuth2ServerModuleOptions,
    IOAuth2ServerOptionsFactory,
} from '../../lib';

@Injectable()
export class TestConfigService
    implements IOAuth2ServerOptionsFactory {
    createOAuth2ServerOptions(): IOAuth2ServerModuleOptions {
        return {};
    }
}
