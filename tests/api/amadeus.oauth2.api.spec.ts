
import { test, expect, request } from '@playwright/test'

let OAUTH_CONFIG = {
    tokenURL: 'https://test.api.amadeus.com/v1/security/oauth2/token',
    clientId: process.env.OAUTH_CLIENT_ID!,
    clientSecret: process.env.OAUTH_CLIENT_SECRET!,
    grantType: process.env.GRANT_TYPE!
}

let accessToken: string;

test.beforeEach('POST -- generate access token', async ({ request }) => {
    let response = await request.post(OAUTH_CONFIG.tokenURL, {
        form: {
            grant_type: OAUTH_CONFIG.grantType,
            client_id: OAUTH_CONFIG.clientId,
            client_secret: OAUTH_CONFIG.clientSecret
        }
    });

    expect(response.status()).toBe(200);
    let jsonResponse = await response.json();
    accessToken = jsonResponse.access_token;
})

test('GET-- get location data', async ({ request }) => {

    let baseURL = 'https://test.api.amadeus.com';
    let endPointURL = '/v1/reference-data/locations';

    let queryParams = {
        subType: 'CITY,AIRPORT',
        keyword: 'MUC',
        countryCode: 'DE'
    }

    let response = await request.get(`${baseURL}${endPointURL}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        params: queryParams
    })

    expect(response.status()).toBe(200);
    let locationJson = await response.json();
    console.log(locationJson.meta.count);
    console.log(locationJson.data[0]);

})