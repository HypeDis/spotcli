import commander from 'commander';
import { transportControls } from './transportControls';

export function makeVolumeCommand(): commander.Command {
  // NOTE: Cant add <position> directly to the Command method when creating a module, must use the arguments method.
  const volume = new commander.Command('vol');
  volume
    .arguments('<position>')
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
  return volume;
}
