import { Flex, List, ListItem } from '@chakra-ui/react';
import React from 'react';
import { ScriptTask } from '../../models/scriptTask';

// TODO: icons that indicate script status

export type TaskListProps = {
  onTaskClick: (task: ScriptTask) => void;
};

const tasks: ScriptTask[] = [
  {
    id: '1',
    name: 'Test .bat',
    script: '/c/Users/Nerijus/Desktop/hello.bat',
  },
  {
    id: '2',
    name: 'Test .sh',
    script: '/c/Users/Nerijus/Desktop/hello.sh',
  },
];

const TaskList: React.FC<TaskListProps> = ({ onTaskClick }) => {
  return (
    <>
      <List bg="blue.700" py={4} w="300px" fontSize="lg">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onClick={() => onTaskClick(task)}
          />
        ))}
      </List>
    </>
  );
};

export type TaskItemProps = {
  task: ScriptTask;
  onClick: () => void;
  isSelected?: boolean;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, isSelected, onClick }) => (
  <ListItem
    as={Flex}
    alignItems="center"
    _hover={{ bg: 'cyan.700' }}
    height="50px"
    cursor="pointer"
    pl={4}
    bg={isSelected ? 'cyan.700' : 'blue.700'}
    borderBottom="1px"
    borderColor="blue.600"
    onClick={onClick}
  >
    {task.name}
  </ListItem>
);

export default TaskList;
