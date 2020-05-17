import chalk from 'chalk';
import { executeAppleScript } from './../scripts/appleScriptExec';
import { osaScript } from './../scripts/osascripts';
import { logErr } from './utils';

const {
  play,
  playPause,
  next,
  prev,
  playTrack,
  getPlayerState,
  setPosition,
  quit,
  getDuration,
  getPlayerPosition,
} = osaScript;

export const transportControls = {
  play: (uri?: string): void => {
    console.log(chalk.green('Playing...'));
    if (uri) executeAppleScript(playTrack(uri)).catch(logErr);
    else executeAppleScript(play).catch(logErr);
  },
  pause: (): void => {
    executeAppleScript(getPlayerState)
      .then(({ stdout, stderr }): void => {
        stdout.trim();
        stdout = stdout.replace(/\n/g, '');
        console.log('stdout', stdout);
        if (stderr) console.log(chalk.red(stderr));
        if (stdout === 'playing') console.log(chalk.green('Pausing..'));
        if (stdout === 'paused') {
          console.log(chalk.green('Playing...'));
        }
        // NOTE: purposefully omitting the 'stopped' case b/c i dont want the pause command to boot Spotify
        executeAppleScript(playPause);
        return;
      })
      .catch(logErr);
  },
  next: (): void => {
    console.log(chalk.green('Playing next track...'));
    executeAppleScript(next).catch(logErr);
  },
  prev: (): void => {
    console.log(chalk.green('Playing previous track...'));
    executeAppleScript(prev).catch(logErr);
  },
  quit: (): void => {
    console.log(chalk.green('Quitting Spotify...'));
    executeAppleScript(quit);
  },
  // replay
  replay: (): void => {
    console.log(chalk.green('Replaying track...'));
    executeAppleScript(setPosition(0));
  },
  pos: (position: number): void => {
    console.log(chalk.green('Moving player position...'));
    executeAppleScript(getDuration)
      .then(({ stdout, stderr }) => {
        if (stderr) {
          console.log(chalk.red(stderr));
          return;
        }
        const duration = parseInt(stdout) / 1000;
        if (position > duration) {
          console.log(chalk.red('Position is out of range'));
        } else {
          executeAppleScript(setPosition(position));
        }
        return;
      })
      .catch(logErr);
  },
  fastForward: (seconds: number): void => {
    console.log(chalk.green('Fast forwarding...'));
    Promise.all([
      executeAppleScript(getPlayerPosition),
      executeAppleScript(getDuration),
    ])
      .then(res => {
        for (const item of res) {
          if (item.stderr) {
            console.log(chalk.red(item.stderr));
            return;
          }
        }
        const [posRes, durRes] = res;
        const duration = parseInt(durRes.stdout) / 1000;
        const position = parseInt(posRes.stdout);
        if (position + seconds > duration) {
          console.log(chalk.red('Fast forward is out of range'));
        } else {
          executeAppleScript(setPosition(position + seconds));
        }
        return;
      })
      .catch(logErr);
  },
  rewind: (seconds: number): void => {
    console.log(chalk.green('Rewinding...'));
    executeAppleScript(getPlayerPosition)
      .then(({ stdout, stderr }) => {
        if (stderr) {
          console.log(chalk.red(stderr));
          return;
        }
        const position = parseInt(stdout);
        let newPosition = position - seconds;
        if (newPosition < 0) {
          newPosition = 0;
        }
        executeAppleScript(setPosition(newPosition));
        return;
      })
      .catch(logErr);
  },
  // vol
  // vol up
  // vol down
};
