import chalk from 'chalk';
import { loadApi, spotifyApiForClient } from './../spotify_api/index';
import { logErr, extractItems } from '../utils/index';
import { transportControls } from './transportControls';

export enum SearchTypes {
  artist = 'artist',
  album = 'album',
  playlist = 'playlist',
  track = 'track',
}

export function searchAndPlay(query: string, type: SearchTypes): void {
  console.log(chalk.green('Searching for ' + type + ' ' + query + '...'));
  loadApi(spotifyApiForClient)
    .then(api => api.search(query, [type as SearchTypes], { limit: 1 }))
    .then(response => {
      const items = extractItems(response.body, type);
      if (items && items.length) {
        const { name, uri } = items[0];
        console.log(chalk.green('Found ', name));
        return transportControls.play(uri);
      }
      console.log(chalk.red(`${type} ${query} not found`));
      return;
    })
    .catch(logErr);
}

export function playArtist(query: string): void {
  searchAndPlay(query, SearchTypes.artist);
}

export function playAlbum(query: string): void {
  searchAndPlay(query, SearchTypes.album);
}

export function playTrack(query: string): void {
  searchAndPlay(query, SearchTypes.track);
}

export function playPlaylist(query: string): void {
  searchAndPlay(query, SearchTypes.playlist);
}
