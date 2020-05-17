// execute appleScript shell commands
import { exec } from 'child_process';
import { ExecReturn } from './appleScripstExec.interfaces';

const OSASCRIPT_EXECUTE = 'osascript -e ';

export function executeAppleScript(script: string): Promise<ExecReturn> {
  const command = OSASCRIPT_EXECUTE + `'${script}';`;
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) reject(err);
      else resolve({ stderr, stdout });
    });
  });
}
