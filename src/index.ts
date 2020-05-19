#!/usr/bin/env node
import { Command } from 'commander';
import { version } from './../package.json';
import * as dotenv from 'dotenv';
dotenv.config();

import { makeShowCommand } from './commands/show.commands';
import { makeVolumeCommand } from './commands/volume.commands';
import { makePlayCommand } from './commands/play.commands';
import { transportControls } from './commands/transportControls';
import { register, registerHelpText } from './commands/register';

const program = new Command();

//TODO: break each section of commands into their own files and populate using the addCommand method

// show commands
program.addCommand(makeShowCommand());
// transport controls
program.addCommand(makePlayCommand());
program
  .command('pause')
  .description('Toggle between play/pause.')
  .action(() => {
    transportControls.pause();
  });
program
  .command('quit')
  .description('Quit Spotify')
  .action(() => {
    transportControls.quit();
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
program
  .command('rw <seconds>')
  .description('Rewind by a given amount of seconds')
  .action(seconds => {
    transportControls.rewind(parseInt(seconds));
  });

program.addCommand(makeVolumeCommand());

program
  .command('toggle <type>')
  .description('Toggle shuffle and repeat\nOptions: shuffle, repeat')
  .action(type => {
    transportControls.setToggle(type);
  });

program
  .command('register')
  .description(registerHelpText)
  .action(() => {
    register();
  });

program.version(version).parse(process.argv);
