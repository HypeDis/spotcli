const TELL_SPOTIFY = 'tell application "Spotify" ';

export const osaScript = {
  getArtist: TELL_SPOTIFY + 'to artist of current track',
  getAlbum: TELL_SPOTIFY + 'to album of current track',
  getTrack: TELL_SPOTIFY + 'to name of current track',
  getDuration: TELL_SPOTIFY + 'to duration of current track',
  getPlayerPosition: TELL_SPOTIFY + 'to player position',
  getUrl: TELL_SPOTIFY + 'to spotify url of current track',
  getPlayerState: TELL_SPOTIFY + 'to player state',
  play: TELL_SPOTIFY + 'to play',
  pause: TELL_SPOTIFY + 'to pause',
  playPause: TELL_SPOTIFY + 'to playpause',
  next: TELL_SPOTIFY + 'to next track',
  prev: TELL_SPOTIFY + 'to set position to 0 previous track',
  quit: TELL_SPOTIFY + 'to quit',
  playTrack: (uri: string): string => TELL_SPOTIFY + `to play track ${uri}`,
  setPosition: (position: number): string =>
    TELL_SPOTIFY + `to set player position to ${position}`,
};
