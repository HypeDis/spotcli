import { SearchTypes } from '../commands/play';

export type PagingObj =
  | SpotifyApi.PagingObject<SpotifyApi.AlbumObjectFull>
  | SpotifyApi.PagingObject<SpotifyApi.AlbumObjectSimplified>
  | SpotifyApi.PagingObject<SpotifyApi.ArtistObjectFull>
  | SpotifyApi.PagingObject<SpotifyApi.ArtistObjectSimplified>
  | SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectFull>
  | SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectSimplified>
  | SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull>
  | SpotifyApi.PagingObject<SpotifyApi.TrackObjectSimplified>;
export type SpotifyItems =
  | SpotifyApi.AlbumObjectFull
  | SpotifyApi.AlbumObjectSimplified
  | SpotifyApi.ArtistObjectFull
  | SpotifyApi.ArtistObjectSimplified
  | SpotifyApi.PlaylistObjectFull
  | SpotifyApi.PlaylistObjectSimplified
  | SpotifyApi.TrackObjectFull
  | SpotifyApi.TrackObjectSimplified;

export function extractItems(
  body: SpotifyApi.SearchResponse,
  type: SearchTypes
): SpotifyItems[] | undefined {
  if (type === 'artist') {
    return body?.artists?.items;
  } else if (type === 'album') {
    return body?.albums?.items;
  } else if (type === 'playlist') {
    return body?.playlists?.items;
  } else if (type === 'track') {
    return body?.tracks?.items;
  }
}
