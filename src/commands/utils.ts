import chalk from 'chalk';
import { ExecReturn } from './../scripts/appleScripstExec.interfaces';

export function logStd({ stdout, stderr }: ExecReturn): void {
  if (stderr) {
    console.log(chalk.red(stderr));
  }
  console.log(chalk.blue(stdout.trim()));
}
export function logErr(err: Error): void {
  console.error(chalk.red(err.message));
}
