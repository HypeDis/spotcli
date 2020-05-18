import { loadApi, spotifyApiForClient } from './../spotify_api/index';
import { logErr } from './utils';
import { transportControls } from './transportControls';

export function playArtist(artistName: string): void {
  loadApi(spotifyApiForClient)
    .then(api =>
      Promise.all([api, api.searchArtists(artistName, { limit: 1 })])
    )
    .then(([api, response]) => {
      const artistId = response.body.artists?.items[0].id;
      if (artistId) {
        return api.getArtist(artistId);
      }
      console.log('artist not found');
      return;
    })
    .then(response => {
      const artistUri = response?.body.uri;
      transportControls.play(artistUri);
      return;
    })
    .catch(logErr);
}
