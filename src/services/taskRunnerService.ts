/* eslint-disable no-console */
import { spawn } from 'child_process';
import shortId from 'shortid';
import treeKill from 'tree-kill';
import { ConsoleLine } from '../models/consoleLine';
import storageService from './storageService';

const isWin = process.platform === 'win32';

export type TaskRunnerOptions = {
  shell?: string;
};

class TaskRunnerService {
  private options: TaskRunnerOptions;

  private runningProcesses = new Map<string, number>();

  constructor() {
    const settings = storageService.getSettings();
    this.options = {
      shell: settings.shell,
    };
  }

  private execute(
    command: string,
    id: string,
    onOutput: (output: string) => void,
    onError: (error: string) => void
  ) {
    const proc = spawn(command, {
      shell: this.options.shell,
    });

    proc.stdout?.on('data', (chunk) => {
      onOutput(chunk.toString());
    });

    proc.stderr?.on('data', (chunk) => {
      onError(chunk.toString());
    });

    proc.on('exit', (code) => {
      this.runningProcesses.delete(id);
      onOutput(`Task exited with code ${code}`);
    });

    return proc.pid;
  }

  executeTask(
    command: string,
    id: string,
    onNewLine?: (line: ConsoleLine) => void
  ) {
    if (this.runningProcesses.has(id)) {
      onNewLine?.({
        id: shortId(),
        text: 'Task is already running.',
        color: 'white',
      });
      return;
    }

    onNewLine?.({
      id: shortId(),
      text: `Starting task with id: ${id}`,
      color: 'white',
    });

    const pid = this.execute(
      command,
      id,
      (output) => onNewLine?.({ id: shortId(), text: output, color: 'white' }),
      (error) => onNewLine?.({ id: shortId(), text: error, color: 'red.500' })
    );

    this.runningProcesses.set(id, pid);
  }

  killTask(id: string) {
    if (this.runningProcesses.has(id)) {
      this.killProcess(this.runningProcesses.get(id)!);
    }
  }

  private killProcess(pid: number) {
    if (isWin) {
      const killProc = spawn('taskkill', ['/pid', pid.toString(), '/f', '/t']);
      killProc.stdout?.on('data', (data) => console.log(data.toString()));
    } else {
      treeKill(pid);
    }
  }
}

export default new TaskRunnerService();
