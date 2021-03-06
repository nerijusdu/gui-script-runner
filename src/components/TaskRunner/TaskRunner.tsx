import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ScriptTask } from '../../models/scriptTask';
import storageService from '../../services/storageService';
import TaskConsole from './TaskConsole';
import TaskList from '../TaskList';

const TaskRunner: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState<ScriptTask>();
  const tasksFromMemory = storageService.getTasks();

  return (
    <Flex w="100%">
      <TaskList
        tasks={tasksFromMemory}
        onTaskSelect={setSelectedTask}
        selectedTaskId={selectedTask?.id}
        executable
      />
      <TaskConsole currentTaskId={selectedTask?.id} />
    </Flex>
  );
};

export default TaskRunner;
