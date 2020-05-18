import chalk from 'chalk';
import { loadApi, spotifyApiForClient } from './../spotify_api/index';
import { logErr } from './utils';
import { transportControls } from './transportControls';

export function playArtist(artistName: string): void {
  loadApi(spotifyApiForClient)
    .then(api => api.searchArtists(artistName, { limit: 1 }))
    .then(response => {
      const uri = response.body?.artists?.items[0].uri;
      if (uri) {
        return transportControls.play(uri);
      }
      console.log('artist not found');
      return;
    })
    .catch(logErr);
}

export function playAlbum(query: string): void {
  loadApi(spotifyApiForClient)
    .then(api => api.searchAlbums(query, { limit: 1 }))
    .then(response => {
      const uri = response.body.albums?.items[0].uri;
      if (uri) {
        return transportControls.play(uri);
      }
      console.log(chalk.red('Album not found'));
      return;
    })
    .catch(logErr);
}

// track, playlist
export function playTrack(query: string): void {
  loadApi(spotifyApiForClient)
    .then(api => api.searchTracks(query, { limit: 1 }))
    .then(response => {
      const uri = response.body.tracks?.items[0].uri;
      if (uri) {
        return transportControls.play(uri);
      }
      console.log(chalk.red('Track not found'));
      return;
    })
    .catch(logErr);
}
export function playPlaylist(query: string): void {
  loadApi(spotifyApiForClient)
    .then(api => api.searchPlaylists(query, { limit: 1 }))
    .then(response => {
      const uri = response.body.playlists?.items[0].uri;
      if (uri) {
        return transportControls.play(uri);
      }
      console.log(chalk.red('Playlist not found'));
      return;
    })
    .catch(logErr);
}
