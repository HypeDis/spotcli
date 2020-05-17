#!/usr/bin/env node
import { Command } from 'commander';
import { version } from './../package.json';
import * as dotenv from 'dotenv';
dotenv.config;

import { show } from './commands/show';
import { transportControls } from './commands/transportControls';

const program = new Command();

//TODO: break each section of commands into their own files and populate using the addCommand method

// show commands
program
  .command('show <type>')
  .description(
    'Show info on currenty playing track.\ntype: artist, album, stats, uri'
  )
  .action(type => {
    show(type);
  });
// transport controls
program
  .command('play [URI]') // TODO: allow urls as well
  .description(
    'Resume playback\nIf optional uri is passed in Spotify will play that'
  )
  .action((URI?: string) => {
    transportControls.play(URI);
  });
// song
// album
// artist
// list
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
// rw
program
  .command('rw <seconds>')
  .description('Rewind by a given amount of seconds')
  .action(seconds => {
    transportControls.rewind(parseInt(seconds));
  });

const volume = program.command('vol <position>');
volume
  /*subcommand descriptions don't do anything so adding vol up and vol down text here*/
  .description(
    `Move the volume slider to the desired position. Range: integer [0, 100]
vol up Increases volume by 10% 
vol down Decreases volume by 10%`
  )
  .action(position => {
    transportControls.setVolAbs(parseInt(position));
  });
volume
  .command('up')
  .description('Increases volume by 10%')
  .action(() => {
    transportControls.setVolRelative(10);
  });
volume
  .command('down')
  .description('Decreases volume by 10%')
  .action(() => {
    transportControls.setVolRelative(-10);
  });

program
  .command('toggle <type>')
  .description('Toggle shuffle and repeat\nOptions: shuffle, repeat')
  .action(type => {
    transportControls.setToggle(type);
  });

program.version(version).parse(process.argv);
