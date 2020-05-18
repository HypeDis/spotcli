import chalk from 'chalk';
import { prompt } from 'inquirer';
// NOTE: writeToEnv import breaks if you dont include index
import { writeToEnv, logErr, EnvVarsObj } from './utils/index';

interface ClientEnvVarsObj extends EnvVarsObj {
  CLIENT_ID: string;
  CLIENT_SECRET: string;
}

export const registerHelpText =
  'Register your spotify CLIENT_ID and CLIENT_SECRET\nTo create a CLIENT_ID and CLIENT_SECRET\nvisit https://developer.spotify.com/dashboard/applications\nand create a new app';

export function register(): void {
  prompt([
    {
      type: 'password',
      mask: '*',
      name: 'CLIENT_ID',
      message: 'What is your Client Id?',
    },
    {
      type: 'password',
      mask: '*',
      name: 'CLIENT_SECRET',
      message: 'What is your Client Secret?',
    },
  ])
    .then(answers => {
      const envVars: ClientEnvVarsObj = { ...answers };
      return writeToEnv(envVars);
    })
    .then(() => {
      console.log(chalk.green('Registered successfully'));
      return;
    })
    .catch(err => {
      if (err.isTtyError) {
        console.log(
          chalk.red("Prompt couldn't be rendered in the current environment")
        );
      } else {
        logErr(err);
      }
      process.exit();
    });
}
