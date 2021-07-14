import { ArrowRightIcon, CloseIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
  Flex,
  IconButton,
  List,
  Stack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
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
  const cancelRef = React.useRef(null);
  const { addNewLine, clearLines } = useSetTaskOutputLine();
  const [focusedTask, setFocusedTask] = useState<ScriptTask | undefined>();

  const executeTask = (task: ScriptTask, argPresetIndex?: number) => {
    clearLines(task.id);
    const command =
      argPresetIndex !== undefined
        ? `${task.script} ${task.argPresets[argPresetIndex]}`
        : task.script;

    if (focusedTask) {
      setFocusedTask(undefined);
    }
    taskRunnerService.executeTask(command, task.id, (line) =>
      addNewLine(task.id, line)
    );
  };

  const onRunTaskClick = (task: ScriptTask) => {
    if (task.argPresets.length) {
      setFocusedTask(task);
    } else {
      executeTask(task);
    }
  };

  return (
    <>
      <List bg="blue.800" py={4} w="500px" fontSize="lg" boxShadow="dark-lg">
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
                  onClick={() => onRunTaskClick(task)}
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
            task={{ id: '', name: '+ Add New', script: '', argPresets: [] }}
            isSelected={selectedTaskId === undefined}
            onClick={onAddClick}
          />
        )}
      </List>
      <AlertDialog
        isOpen={!!focusedTask}
        onClose={() => setFocusedTask(undefined)}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogContent>
          <AlertDialogHeader>Select argument preset</AlertDialogHeader>
          <AlertDialogBody>
            <Stack>
              {focusedTask?.argPresets.map((preset, index) => (
                <Button
                  key={index}
                  onClick={() => executeTask(focusedTask!, index)}
                >
                  {preset}
                </Button>
              ))}
              <Button onClick={() => executeTask(focusedTask!)}>
                Run without arguments
              </Button>
            </Stack>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              colorScheme="red"
              ref={cancelRef}
              onClick={() => setFocusedTask(undefined)}
            >
              Cancel
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default TaskList;
