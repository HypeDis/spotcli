import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { logErr } from './logging';

export interface EnvVarsObj {
  [key: string]: string;
}

const ENV_FILE_PATH = path.join(process.cwd(), '.env');

function parseEnv(data: string): EnvVarsObj {
  const envVars: EnvVarsObj = {};
  const rows = data.split('\n');
  rows.forEach(row => {
    const [key, val] = row.split('=');
    if (key && val) {
      envVars[key] = val;
    }
  });
  return envVars;
}

function convertObjToText(envVars: EnvVarsObj): string {
  let data = '';
  const entries = Object.entries(envVars);
  entries.forEach(([key, val]) => {
    data += `${key}=${val}\n`;
  });
  return data;
}

function readFilePromise(path: string, encoding: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, encoding, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function writeFilePromise(
  path: string,
  data: string,
  encoding: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, encoding, err => {
      if (err) reject(err);
      else resolve();
    });
  });
}

function createEnv(): void {
  writeFilePromise(ENV_FILE_PATH, '', 'utf8')
    .then(() => {
      console.log(chalk.green('File created.'));
      return;
    })
    .catch(logErr);
}

function readEnv(): Promise<string> {
  return readFilePromise(ENV_FILE_PATH, 'utf8').then(data => data);
}

export function writeToEnv(newEnvVars: EnvVarsObj): Promise<void> {
  let fileCreated = false;
  return readEnv()
    .then(parseEnv)
    .then(envVarsObj => {
      const combinedEnvVars = { ...envVarsObj, ...newEnvVars };
      const data = convertObjToText(combinedEnvVars);
      console.log(chalk.green('Writing file...'));
      return writeFilePromise(ENV_FILE_PATH, data, 'utf8');
    })
    .catch(err => {
      if (err.code === 'ENOENT') {
        console.log(chalk.green('.env file not found. Creating file...'));
        fileCreated = true;
        return createEnv();
      } else {
        logErr(err);
      }
    })
    .finally(() => {
      if (fileCreated) {
        return writeToEnv(newEnvVars);
      }
    });
}
