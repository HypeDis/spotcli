#!/usr/bin/env node
import { Command } from 'commander';
import { version } from './../package.json';

import { show } from './commands/show';
import { transportControls } from './commands/transportControls';
import chalk from 'chalk';

const program = new Command();

// show commands
program
  .command('show <type>')
  .description(
    'Show info on currenty playing track.\nOptions: artist album stats url'
  )
  .action(type => {
    show(type);
  });
// transport controls
program
  .command('play [URI]')
  .description('Resume playback')
  .action((URI?: string) => {
    transportControls.play(URI);
  });
program
  .command('pause')
  .description('Toggle between play/pause.')
  .action(() => {
    transportControls.pause();
  });
program
  .command('next')
  .description('Go to the next track')
  .action(() => {
    transportControls.next();
  });
program
  .command('prev')
  .description('Go to the previous track')
  .action(() => {
    transportControls.prev();
  });

program
  .command('quit')
  .description('Quit Spotify')
  .action(() => {
    transportControls.quit();
  });

program
  .command('replay')
  .description('Replay current track')
  .action(() => {
    transportControls.replay();
  });
program
  .command('pos <position>')
  .description('Move to a specific position in a song (given in seconds)')
  .action(position => {
    transportControls.pos(parseInt(position));
  });
program
  .command('ff <seconds>')
  .description('Fast forward by a given amount of seconds')
  .action(seconds => {
    transportControls.fastForward(parseInt(seconds));
  });
// rw
program
  .command('rw <seconds>')
  .description('Rewind by a given amount of seconds')
  .action(seconds => {
    transportControls.rewind(parseInt(seconds));
  });
// vol
// vol up
// vol down

program.version(version).parse(process.argv);

// if (program.show) show(program.show);
