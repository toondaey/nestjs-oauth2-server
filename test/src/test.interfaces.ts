import {
    Token,
    RefreshToken,
    AuthorizationCode,
} from 'oauth2-server';

export interface ITestExpectedResponses {
    accessToken: Token | false;
    authorizationCode: AuthorizationCode | false;
    refreshToken: RefreshToken | false;
}
