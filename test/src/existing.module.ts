import { Module } from '@nestjs/common';

import { TestConfigService } from './test-config.service';

@Module({
    providers: [TestConfigService],
    exports: [TestConfigService],
})
export class ExistingModule {}
