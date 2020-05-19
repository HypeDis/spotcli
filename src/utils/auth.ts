import * as dotenv from 'dotenv';
dotenv.config();
import querystring from 'querystring';
import axios from 'axios';

interface AuthResponseBody {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

const CREDENTIAL_ERROR = ReferenceError(
  'Credentials not found. Please register your Spotify app.\nRun "spotcli help register" for more help'
);

const CLIENT_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const { CLIENT_ID, CLIENT_SECRET } = process.env;

const CLIENT_CREDENTIALS = Buffer.from(
  `${CLIENT_ID}:${CLIENT_SECRET}`
).toString('base64');

export function hasCredentials(): boolean {
  return CLIENT_ID !== undefined && CLIENT_SECRET !== undefined;
}

export function getClientAccessToken(): Promise<AuthResponseBody> {
  if (!hasCredentials()) {
    throw CREDENTIAL_ERROR;
  }
  return axios
    .post(
      CLIENT_TOKEN_URL,
      querystring.stringify({
        /* eslint-disable */
        grant_type: 'client_credentials',
        /* eslint-enable */
      }),
      {
        headers: {
          Authorization: 'Basic ' + CLIENT_CREDENTIALS,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    )
    .then(response => response.data);
}
