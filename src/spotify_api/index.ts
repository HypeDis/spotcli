import SpotifyWebApi from 'spotify-web-api-node';
const { CLIENT_ID, CLIENT_SECRET } = process.env;
import { getClientAccessToken, logErr } from './../commands/utils/index';

export const spotifyApiForClient = new SpotifyWebApi({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
});

export function loadApi(api: SpotifyWebApi): Promise<SpotifyWebApi> {
  console.log('access token from api', api.getAccessToken());
  if (api.getAccessToken()) {
    return api.refreshAccessToken().then(() => api);
  }
  return getClientAccessToken().then(data => {
    console.log('setting up spotify api');
    api.setAccessToken(data.access_token);
    return api;
  });
}
