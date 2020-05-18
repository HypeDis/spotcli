import commander from 'commander';
import { transportControls } from './transportControls';
import chalk from 'chalk';
import { playArtist } from './play';

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
    .description('play artist')
    .action((name, rest) => {
      const artistName = name + ' ' + rest.join(' ');
      console.log(chalk.green('Searching for artist ' + artistName + '...'));
      playArtist(artistName);
      // get uri and play it
    });
  return play;
}
