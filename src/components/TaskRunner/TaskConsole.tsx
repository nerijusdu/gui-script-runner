import { Flex, Text } from '@chakra-ui/react';
import React, { useCallback, useEffect } from 'react';
import { useTaskOutput } from '../../state/tasksOutputState';

export type TaskConsoleProps = {
  currentTaskId?: string;
};

const TaskConsole: React.FC<TaskConsoleProps> = ({ currentTaskId }) => {
  const lines = useTaskOutput(currentTaskId);
  const messagesEndRef = React.createRef<HTMLDivElement>();
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messagesEndRef]);
  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

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
      <div ref={messagesEndRef} />
    </Flex>
  );
};

export default TaskConsole;
