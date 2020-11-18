import { Controller, Post, Req } from '@nestjs/common';

import { OAuth2Authenticate } from '../../lib/decorators/authenticate.decorator';

@Controller()
export class AppController {
    @Post()
    @OAuth2Authenticate()
    authenticateClient(@Req() request: any) {
        console.log(request.body);
    }
}
