import { Injectable } from '@nestjs/common';

import { Oauth2ServerService } from '../../lib';

@Injectable()
export class AppService {
    constructor(private readonly exampleService: Oauth2ServerService) {}
}
