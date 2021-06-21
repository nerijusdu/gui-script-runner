import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ScriptTask } from '../../models/scriptTask';
import TaskConsole from './TaskConsole';
import TaskList from './TaskList';

const tasksFromMemory: ScriptTask[] = [
  {
    id: '1',
    name: 'Test .bat',
    script: '/c/Users/NerijusDesktop/hello.bat',
  },
  {
    id: '2',
    name: 'Test .sh',
    script: '/c/Users/Nerijus/Desktop/hello.sh',
  },
];

const TaskRunner: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<ScriptTask>();

  return (
    <Flex w="100%">
      <TaskList
        tasks={tasksFromMemory}
        onTaskSelect={setSelectedTask}
        selectedTaskId={selectedTask?.id}
      />
      <TaskConsole currentTaskId={selectedTask?.id} />
    </Flex>
  );
};

export default TaskRunner;
