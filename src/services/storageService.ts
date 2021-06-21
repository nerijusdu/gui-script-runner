import fs from 'fs';
import os from 'os';
import { ScriptTask } from '../models/scriptTask';

type Settings = {
  shell?: string;
  tasks: ScriptTask[];
};

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private loadFile<T>(path: string, defaultValue?: any): T {
    this.ensureFileExists(path, defaultValue);
    const buffer = fs.readFileSync(path);
    return JSON.parse(buffer.toString());
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ensureFileExists(path: string, defaultContent: any) {
    if (!fs.existsSync(storageDir)) {
      fs.mkdirSync(storageDir);
    }

    if (!fs.existsSync(path)) {
      const stream = fs.createWriteStream(path);
      stream.write(JSON.stringify(defaultContent));
      stream.close();
    }
  }
}

export default new StorageService();
