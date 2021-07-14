import { ArrowRightIcon, CloseIcon } from '@chakra-ui/icons';
import { Flex, IconButton, List } from '@chakra-ui/react';
import React from 'react';
import { ScriptTask } from '../models/scriptTask';
import taskRunnerService from '../services/taskRunnerService';
import { useSetTaskOutputLine } from '../state/tasksOutputState';
import TaskItem from './TaskRunner/TaskItem';

// TODO: icons that indicate script status

export type TaskListProps = {
  onTaskSelect: (task: ScriptTask) => void;
  tasks: ScriptTask[];
  selectedTaskId?: string;
  executable?: boolean;
  onAddClick?: () => void;
};

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onTaskSelect,
  selectedTaskId,
  executable,
  onAddClick,
}) => {
  const { addNewLine, clearLines } = useSetTaskOutputLine();

  const executeTask = (task: ScriptTask) => {
    clearLines(task.id);
    taskRunnerService.executeTask(task.script, task.id, (line) =>
      addNewLine(task.id, line)
    );
  };

  return (
    <>
      <List bg="blue.800" py={4} w="500px" fontSize="lg">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onClick={() => onTaskSelect(task)}
            isSelected={selectedTaskId === task.id}
          >
            {executable && (
              <Flex>
                <IconButton
                  onClick={() => executeTask(task)}
                  bg="transparent"
                  _hover={{ bg: 'cyan.800' }}
                  icon={<ArrowRightIcon />}
                  aria-label="run task"
                  isRound
                />
                <IconButton
                  onClick={() => taskRunnerService.killTask(task.id)}
                  bg="transparent"
                  _hover={{ bg: 'cyan.800' }}
                  icon={<CloseIcon />}
                  aria-label="kill task"
                  isRound
                />
              </Flex>
            )}
          </TaskItem>
        ))}
        {onAddClick && (
          <TaskItem
            task={{ id: '', name: '+ Add New', script: '' }}
            isSelected={selectedTaskId === undefined}
            onClick={onAddClick}
          />
        )}
      </List>
    </>
  );
};

export default TaskList;
