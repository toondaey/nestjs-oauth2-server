import moment = require('moment');

export const CLIENT = {
    id: '12345678',
    grants: ['authorization_code'],
    redirectUris: ['https://example.org'],
};

export const ACCESS_TOKEN = {
    accessToken: '1234567890',
    user: {},
    client: CLIENT,
    accessTokenExpiresAt: moment().add(30, 'd').toDate(),
};

export const AUTHORIZATION_CODE = {
    authorizationCode: 'string',
    expiresAt: moment().add(1, 'd').toDate(),
    redirectUri: 'https://example.org',
    scope: 'string',
    client: CLIENT,
    user: {},
};

export const REFRESH_TOKEN = {
    refreshToken: 'string',
    refreshTokenExpiresAt: moment().add(1, 'd').toDate(),
    scope: 'string',
    client: CLIENT,
    user: {},
};
