import { exec } from 'child_process';
import shortId from 'shortid';
import { ConsoleLine } from '../models/consoleLine';
import storageService from './storageService';

export type TaskRunnerOptions = {
  shell?: string;
};

class TaskRunnerService {
  private options: TaskRunnerOptions;

  constructor() {
    const settings = storageService.getSettings();
    this.options = {
      shell: settings.shell,
    };
  }

  private execute(
    command: string,
    onOutput: (output: string) => void,
    onError: (error: string) => void
  ) {
    const proc = exec(command, {
      shell: this.options.shell,
    });

    proc.stdout?.on('data', (chunk) => {
      onOutput(chunk);
    });

    proc.stderr?.on('data', (chunk) => {
      onError(chunk);
    });
  }

  executeTask(command: string, onNewLine?: (line: ConsoleLine) => void) {
    this.execute(
      command,
      (output) => onNewLine?.({ id: shortId(), text: output, color: 'white' }),
      (error) => onNewLine?.({ id: shortId(), text: error, color: 'red.500' })
    );
  }
}

export default new TaskRunnerService();
