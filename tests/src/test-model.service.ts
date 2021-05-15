import {
    Token,
    Client,
    RefreshToken,
    AuthorizationCode,
    RefreshTokenModel,
    AuthorizationCodeModel,
    RequestAuthenticationModel,
} from 'oauth2-server';
import moment = require('moment');
import { Inject, Injectable, Optional } from '@nestjs/common';

import {
    CLIENT,
    ACCESS_TOKEN,
    REFRESH_TOKEN,
    AUTHORIZATION_CODE,
} from './data';
import { OAuth2Model } from '../../lib';
import { RESPONSES } from './test.constants';
import { ITestExpectedResponses } from './test.interfaces';

@OAuth2Model()
export class TestModelService
    implements
        RequestAuthenticationModel,
        AuthorizationCodeModel,
        RefreshTokenModel {
    constructor(
        @Optional()
        @Inject(RESPONSES)
        readonly testResponses: ITestExpectedResponses,
    ) {}

    async getAccessToken(): Promise<Token | false> {
        return this.testResponses &&
            this.testResponses.accessToken !== undefined
            ? this.testResponses.accessToken
            : ACCESS_TOKEN;
    }

    async getClient(): Promise<Client> {
        return CLIENT;
    }

    async getUser() {
        return {};
    }

    async saveToken(
        token: Token,
        client: any,
        user: any,
    ): Promise<Token | false> {
        return this.testResponses &&
            this.testResponses.accessToken !== undefined
            ? this.testResponses.accessToken
            : {
                  ...token,
                  accessTokenExpiresAt: moment().add(1, 'd').toDate(),
                  client,
                  user,
              };
    }

    async verifyScope(): Promise<boolean> {
        return true;
    }

    async getAuthorizationCode(): Promise<AuthorizationCode | false> {
        return this.testResponses &&
            this.testResponses.authorizationCode !== undefined
            ? this.testResponses.authorizationCode
            : AUTHORIZATION_CODE;
    }

    async saveAuthorizationCode(): Promise<
        AuthorizationCode | false
    > {
        return this.testResponses &&
            this.testResponses.authorizationCode !== undefined
            ? this.testResponses.authorizationCode
            : AUTHORIZATION_CODE;
    }

    async revokeAuthorizationCode(): Promise<boolean> {
        return true;
    }

    async getRefreshToken(): Promise<RefreshToken | false> {
        return this.testResponses &&
            this.testResponses.refreshToken !== undefined
            ? this.testResponses.refreshToken
            : REFRESH_TOKEN;
    }

    async revokeToken(): Promise<boolean> {
        return false;
    }
}
