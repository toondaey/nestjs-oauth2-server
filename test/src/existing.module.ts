import { Module } from '@nestjs/common';

import { OAuth2ConfigService } from './oauth2-config.service';

@Module({
    providers: [OAuth2ConfigService],
    exports: [OAuth2ConfigService],
})
export class ExistingModule {}
