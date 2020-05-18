import commander from 'commander';
import { transportControls } from './transportControls';

export function makePlayCommand(): commander.Command {
  const play = new commander.Command('play') // TODO: allow urls as well
    .arguments('[URI]')
    .description(
      'Resume playback\nIf optional uri is passed in Spotify will play that'
    )
    .action((URI = '') => {
      transportControls.play(URI);
    });
  return play;
}
