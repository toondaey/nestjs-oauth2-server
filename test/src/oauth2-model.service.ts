import { Injectable } from '@nestjs/common';
import { AuthorizationCodeModel, Token } from 'oauth2-server';

@Injectable()
export class OAuth2ModelService {
    async getAccessToken(accessToken: string) {
        console.log(this);
        return {
            accessToken: '',
            user: {},
            client: {
                id: '',
                grants: '',
                accessTokenExpiresAt: new Date(),
            },
        };
    }

    // Or, calling a Node-style callback.
    // getAuthorizationCode: function(done: (...args: any[]) => any) {
    //   done(null, 'works!');
    // },

    // Or, using generators.
    async getClient() {
        return { id: '', grants: '' };
    }

    // Or, async/wait (using Babel).
    // getUser: async function() {
    //   return '';
    // },

    async saveToken(
        token: Token,
        client: any,
        user: any,
    ): Promise<Token> {
        return { ...token, accessTokenExpiresAt: new Date() };
    }

    async verifyScope() {
        return true;
    }
}
