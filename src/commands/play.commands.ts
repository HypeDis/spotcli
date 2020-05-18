import commander from 'commander';
import { transportControls } from './transportControls';
import chalk from 'chalk';
import { playArtist, playAlbum, playTrack, playPlaylist } from './play';

export function makePlayCommand(): commander.Command {
  const play = new commander.Command('play') // TODO: allow urls as well
    .arguments('[URI]')
    .description(
      'Resume playback\nIf optional uri is passed in Spotify will play that'
    )
    .action((URI = '') => {
      transportControls.play(URI);
    });

  play
    .command('artist <name> [rest...]')
    .description('Play an artists top tracks')
    .action((name, rest) => {
      const queryName = name + ' ' + rest.join(' ');
      console.log(chalk.green('Searching for artist ' + queryName + '...'));
      playArtist(queryName);
      // get uri and play it
    });
  play
    .command('album <name> [rest...]')
    .description('Play an album ')
    .action((name, rest) => {
      const queryName = name + ' ' + rest.join(' ');
      console.log(chalk.green('Searching for album ' + queryName + '...'));
      playAlbum(queryName);
      // get uri and play it
    });
  play
    .command('track <name> [rest...]')
    .description('Play a track')
    .action((name, rest) => {
      const queryName = name + ' ' + rest.join(' ');
      console.log(chalk.green('Searching for track ' + queryName + '...'));
      playTrack(queryName);
      // get uri and play it
    });
  play
    .command('list <name> [rest...]')
    .description('Play a track')
    .action((name, rest) => {
      const queryName = name + ' ' + rest.join(' ');
      console.log(chalk.green('Searching for playlist ' + queryName + '...'));
      playPlaylist(queryName);
      // get uri and play it
    });
  return play;
}
