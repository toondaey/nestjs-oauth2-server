import { Injectable } from '@nestjs/common';

import { ExampleService } from '../../lib';

@Injectable()
export class AppService {
    constructor(private readonly exampleService: ExampleService) {}
}
