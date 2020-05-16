import { executeAppleScript } from './../scripts/appleScriptExec';
import { osaScript } from './../scripts/osascripts';
import chalk from 'chalk';

import { ExecReturn } from './../interfaces/exec';

function logStd({ stdout, stderr }: ExecReturn): void {
  if (stderr) {
    console.log(chalk.red(stderr));
  }
  console.log(chalk.blue(stdout));
}
function logErr(err: Error): void {
  console.error(chalk.red(err.message));
}

function showAlbum(): void {
  executeAppleScript(osaScript.showAlbum).then(logStd).catch(logErr);
}
