import commander from 'commander';
import { transportControls } from './transportControls';
import { playArtist, playAlbum, playTrack, playPlaylist } from './play';

export function makePlayCommand(): commander.Command {
  const play = new commander.Command('play') // TODO: allow urls as well
    .description(
      '[artist|track|album|list|uri] Resume playback or play a specific artist, track, album, playlist, or uri'
    )
    .action(() => {
      transportControls.play();
    });

  play
    .command('uri [uri]')
    .description('Play a given uri')
    .action(uri => {
      transportControls.play(uri);
    });

  play
    .command('artist <name> [rest_of_name...]')
    .description("Play an artist's top tracks")
    .action((name, rest) => {
      const queryName = name + ' ' + rest.join(' ');
      playArtist(queryName);
      // get uri and play it
    });
  play
    .command('album <name> [rest_of_name...]')
    .description('Play an album ')
    .action((name, rest) => {
      const queryName = name + ' ' + rest.join(' ');
      playAlbum(queryName);
      // get uri and play it
    });
  play
    .command('track <name> [rest_of_name...]')
    .description('Play a track')
    .action((name, rest) => {
      const queryName = name + ' ' + rest.join(' ');
      playTrack(queryName);
      // get uri and play it
    });
  play
    .command('list <name> [rest_of_name...]')
    .description('Play a playlist')
    .action((name, rest) => {
      const queryName = name + ' ' + rest.join(' ');
      playPlaylist(queryName);
      // get uri and play it
    });
  return play;
}
