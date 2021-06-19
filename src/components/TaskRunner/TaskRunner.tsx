import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { exec } from 'child_process';
import { ScriptTask } from '../../models/scriptTask';
import TaskConsole from './TaskConsole';
import TaskList from './TaskList';

function execute(
  command: string,
  callback: (output: string, error: string) => void
) {
  exec(
    command,
    {
      shell: 'C:\\Program Files\\git\\usr\\bin\\bash.exe',
    },
    (error, stdout, stderr) => {
      callback(stdout, stderr);
    }
  );
}

const TaskRunner: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const executeTask = (task: ScriptTask) => {
    console.log(task.script);
    execute(task.script, (output, error) => {
      if (error) {
        console.error(error);
      }
      setLines(output.split(/\n/));
    });
  };
  return (
    <Flex w="100%">
      <TaskList onTaskClick={executeTask} />
      <TaskConsole lines={lines} />
    </Flex>
  );
};

export default TaskRunner;
