import OAuth2Server = require('oauth2-server');
import { Injectable, ExecutionContext } from '@nestjs/common';

@Injectable()
export class BaseGuard {
    constructor(protected readonly oauthServer: OAuth2Server) {}

    getRequest<T>(context: ExecutionContext): T {
        return context.switchToHttp().getRequest<T>();
    }

    getResponse<T>(context: ExecutionContext): T {
        return context.switchToHttp().getResponse<T>();
    }
}
