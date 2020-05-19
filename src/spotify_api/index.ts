import SpotifyWebApi from 'spotify-web-api-node';
const { CLIENT_ID, CLIENT_SECRET } = process.env;
import { getClientAccessToken } from '../utils/index';

export const spotifyApiForClient = new SpotifyWebApi({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
});

export function loadApi(api: SpotifyWebApi): Promise<SpotifyWebApi> {
  return getClientAccessToken().then(data => {
    api.setAccessToken(data.access_token);
    return api;
  });
}
