import { Injectable } from '@nestjs/common';

import {
    ExampleOptionsFactory,
    ExampleModuleOptions,
} from '../../lib/example.interfaces';

@Injectable()
export class ExampleConfigService implements ExampleOptionsFactory {
    createPdfOptions(): ExampleModuleOptions {
        return {};
    }
}
