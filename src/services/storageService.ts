import fs from 'fs';
import os from 'os';
import { ScriptTask } from '../models/scriptTask';
import { Settings } from '../models/settings';

const storageDir = `${os.homedir()}/gui-script-runner`;
const settingsPath = `${storageDir}/settings.json`;
const tasksPath = `${storageDir}/tasks.json`;

class StorageService {
  private settings?: Settings;

  private tasks?: ScriptTask[];

  getSettings(forceRefreh?: boolean) {
    if (!this.settings || forceRefreh) {
      this.settings = this.loadFile<Settings>(settingsPath, {});
    }

    return this.settings;
  }

  getTasks(forceRefreh?: boolean) {
    if (!this.tasks || forceRefreh) {
      this.tasks = this.loadFile<ScriptTask[]>(tasksPath, []);
    }

    return this.tasks;
  }

  saveTask(task: ScriptTask) {
    if (!this.tasks) {
      // eslint-disable-next-line no-console
      console.error('Tasks array is not initialized!?!?!?!');
      return;
    }

    const index = this.tasks.findIndex((x) => x.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
    } else {
      this.tasks.push(task);
    }

    this.saveToFile<ScriptTask[]>(tasksPath, this.tasks!);
  }

  saveSettings(settings: Settings) {
    this.saveToFile<Settings>(settingsPath, settings);
  }

  deleteTask(id: string) {
    if (!this.tasks) {
      // eslint-disable-next-line no-console
      console.error('Tasks array is not initialized!?!?!?!');
      return;
    }

    const index = this.tasks.findIndex((x) => x.id === id);
    this.tasks = [
      ...this.tasks.slice(0, index),
      ...this.tasks.slice(index + 1),
    ];

    this.saveToFile<ScriptTask[]>(tasksPath, this.tasks!);
  }

  private saveToFile<T>(path: string, value: T) {
    this.ensureFileExists(path, value, true);
  }

  private loadFile<T>(path: string, defaultValue?: T): T {
    this.ensureFileExists(path, defaultValue);
    const buffer = fs.readFileSync(path);
    return JSON.parse(buffer.toString());
  }

  private ensureFileExists<T>(
    path: string,
    defaultContent?: T,
    overwrite?: boolean
  ) {
    if (!fs.existsSync(storageDir)) {
      fs.mkdirSync(storageDir);
    }

    if (!fs.existsSync(path) || overwrite) {
      const stream = fs.createWriteStream(path);
      stream.write(JSON.stringify(defaultContent));
      stream.close();
    }
  }
}

export default new StorageService();
