import { Flex, ListItem } from '@chakra-ui/react';
import React from 'react';
import { ScriptTask } from '../../models/scriptTask';

export type TaskItemProps = {
  task: ScriptTask;
  onClick: () => void;
  isSelected?: boolean;
};

const TaskItem: React.FC<TaskItemProps> = ({
  children,
  task,
  isSelected,
  onClick,
}) => (
  <ListItem
    as={Flex}
    alignItems="center"
    justifyContent="space-between"
    _hover={{ bg: 'cyan.700' }}
    cursor="pointer"
    pl={4}
    bg={isSelected ? 'cyan.700' : 'blue.800'}
    borderBottom="1px"
    borderColor="blue.700"
    onClick={onClick}
  >
    {task.name}
    {children}
  </ListItem>
);

export default TaskItem;
