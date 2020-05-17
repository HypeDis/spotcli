#!/usr/bin/env node
import { Command } from 'commander';
import { version } from './../package.json';

import { show } from './commands/show';

const program = new Command();

program
  .command('show <type>')
  .description(
    'Show info on currenty playing track.\nOptions: artist album stats url'
  )
  .action(type => {
    show(type);
  });
program
  .command('play', 'Resume playback.')
  .command('pause', 'Toggle between play/pause.')
  .command('next', 'Go to the next track.')
  .command('prev', 'Go to the previous track.');

program.version(version).parse(process.argv);

// if (program.show) show(program.show);
