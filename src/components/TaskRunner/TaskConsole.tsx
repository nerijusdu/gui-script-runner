import { Flex } from '@chakra-ui/react';
import React from 'react';

export type TaskConsoleProps = {
  lines: string[];
};

const TaskConsole: React.FC<TaskConsoleProps> = ({ lines }) => {
  return (
    <Flex flexDirection="column" p={4} bg="black" w="100%">
      {lines.map((line, i) => (
        <code key={i}>{line}</code>
      ))}
    </Flex>
  );
};

export default TaskConsole;
