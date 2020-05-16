const TELL_SPOTIFY = 'tell application "Spotify" ';

export const osaScript = {
  showArtist: TELL_SPOTIFY + 'to artist of current track',
  showAlbum: TELL_SPOTIFY + 'to album of current track',
  showTrack: TELL_SPOTIFY + 'to current track',
  showStatus: '', // artist, track, album, position/duration
};
