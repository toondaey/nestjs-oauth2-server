import { Module } from '@nestjs/common';

import { ExampleConfigService } from './example-config.service';

@Module({
    providers: [ExampleConfigService],
    exports: [ExampleConfigService],
})
export class ExistingModule {}
