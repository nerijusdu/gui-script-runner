import { ArrowRightIcon } from '@chakra-ui/icons';
import { IconButton, List } from '@chakra-ui/react';
import React from 'react';
import { ScriptTask } from '../../models/scriptTask';
import taskRunnerService from '../../services/taskRunnerService';
import { useSetTaskOutputLine } from '../../state/tasksOutputState';
import TaskItem from './TaskItem';

// TODO: icons that indicate script status

export type TaskListProps = {
  onTaskSelect: (task: ScriptTask) => void;
  tasks: ScriptTask[];
  selectedTaskId?: string;
};

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onTaskSelect,
  selectedTaskId,
}) => {
  const { addNewLine, clearLines } = useSetTaskOutputLine();

  const executeTask = (task: ScriptTask) => {
    clearLines(task.id);
    taskRunnerService.executeTask(task.script, (line) =>
      addNewLine(task.id, line)
    );
  };

  return (
    <>
      <List bg="blue.700" py={4} w="500px" fontSize="lg">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onClick={() => onTaskSelect(task)}
            isSelected={selectedTaskId === task.id}
          >
            <IconButton
              onClick={() => executeTask(task)}
              bg="transparent"
              _hover={{ bg: 'cyan.800' }}
              icon={<ArrowRightIcon />}
              aria-label="run task"
              isRound
            />
          </TaskItem>
        ))}
      </List>
    </>
  );
};

export default TaskList;
