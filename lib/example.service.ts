import { Inject, Injectable } from '@nestjs/common';

import { ExampleModuleOptions } from './example.interfaces';
import { EXAMPLE_OPTIONS_TOKEN } from './example.constants';

@Injectable()
export class ExampleService {
    constructor(
        @Inject(EXAMPLE_OPTIONS_TOKEN)
        private readonly moduleOptions: ExampleModuleOptions,
    ) {}

    // Class methods and properties...
}
