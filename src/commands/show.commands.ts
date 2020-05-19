import commander from 'commander';
import { showActions } from './show';

export function makeShowCommand(): commander.Command {
  const show = new commander.Command('show').description(
    '<artist|album|stats|uri> Show info on the currenty playing track.'
  );

  show
    .command('artist')
    .description('Show the currently playing artist')
    .action(() => {
      showActions('artist');
    });
  show
    .command('album')
    .description('Show the currently playing artist')
    .action(() => {
      showActions('album');
    });

  show
    .command('stats')
    .description(
      'Show the artist, track, album, and time of the currently playing track'
    )
    .action(() => {
      showActions('stats');
    });
  show
    .command('uri')
    .description('Show the URI of the currently playing track')
    .action(() => {
      showActions('uri');
    });
  return show;
}
