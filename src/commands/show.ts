import { executeAppleScript } from './../scripts/appleScriptExec';
import { osaScript } from './../scripts/osascripts';
import chalk from 'chalk';

import { logErr, logStd } from '../utils';
import { formatTime } from '../utils';
import { TimeUnits } from '../utils';

const {
  getAlbum,
  getArtist,
  getDuration,
  getPlayerPosition,
  getTrack,
  getUrl,
  getVol,
} = osaScript;

function logStat(script: string): void {
  executeAppleScript(script).then(logStd).catch(logErr);
}

function showAll(): void {
  Promise.all([
    executeAppleScript(getArtist),
    executeAppleScript(getTrack),
    executeAppleScript(getAlbum),
    executeAppleScript(getPlayerPosition),
    executeAppleScript(getDuration),
  ])
    .then(stats => {
      for (const stat of stats) {
        if (stat.stderr) console.log(chalk.red(stat.stderr));
      }

      const [artist, track, album, position, duration] = stats;
      const positionFormatted = formatTime(parseInt(position.stdout));
      const durationFormatted = formatTime(
        parseInt(duration.stdout),
        TimeUnits.MILLI_SECONDS
      );

      console.log(chalk.green('Playing Now'));
      console.log(
        chalk.blue(
          `Artist: ${artist.stdout.trim()}\nTrack: ${track.stdout.trim()}\nAlbum: ${album.stdout.trim()}\nTime: ${positionFormatted}/${durationFormatted}`
        )
      );
      return;
    })
    .catch(logErr);
}

export function show(flag: string): void {
  switch (flag) {
    case 'album':
      logStat(getAlbum);
      break;
    case 'artist':
      logStat(getArtist);
      break;
    case 'track':
      logStat(getTrack);
      break;
    case 'stats':
      showAll();
      break;
    case 'uri':
      logStat(getUrl);
      break;
    case 'vol':
      logStat(getVol);
      break;
    default:
      console.log('Option not recognized');
  }
}
