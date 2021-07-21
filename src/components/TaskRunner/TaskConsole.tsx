import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useTaskOutput } from '../../state/tasksOutputState';

export type TaskConsoleProps = {
  currentTaskId?: string;
};

const TaskConsole: React.FC<TaskConsoleProps> = ({ currentTaskId }) => {
  const lines = useTaskOutput(currentTaskId);

  return (
    <Flex
      flexDirection="column"
      p={4}
      bg="black"
      w="100%"
      h="100vh"
      overflow="auto"
    >
      {lines.map((line) => (
        <Text as="code" color={line.color} key={line.id}>
          {line.text}
        </Text>
      ))}
    </Flex>
  );
};

export default TaskConsole;
