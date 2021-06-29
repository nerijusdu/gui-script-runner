import {
  Button,
  Flex,
  Input,
  Stack,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import shortid from 'shortid';
import { ScriptTask } from '../../models/scriptTask';
import storageService from '../../services/storageService';

export type ScriptFormProps = {
  task?: ScriptTask;
  onUpdate: () => void;
};

const ScriptForm: React.FC<ScriptFormProps> = ({ task, onUpdate }) => {
  const [name, setName] = useState('');
  const [script, setScript] = useState('');
  const toast = useToast();

  useEffect(() => {
    setName(task?.name || '');
    setScript(task?.script || '');
  }, [task]);

  const save = () => {
    const taskToSave = task || { id: shortid() };
    storageService.saveTask({
      ...taskToSave,
      name,
      script,
    });
    setName(task?.name || '');
    setScript(task?.script || '');
    toast({
      title: 'Saved!',
      status: 'success',
    });
    onUpdate();
  };

  const remove = () => {
    if (!task) return;
    storageService.deleteTask(task.id);
    toast({
      title: 'Removed!',
      status: 'success',
    });
    onUpdate();
  };

  return (
    <Flex w="100%" flexDir="column" padding={2}>
      <Stack pb={4}>
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Textarea
          placeholder="Script"
          value={script}
          onChange={(e) => setScript(e.target.value)}
        />
      </Stack>
      <Stack direction="row-reverse" align="center">
        <Button colorScheme="green" onClick={save} w="100%">
          Save
        </Button>
        <Button colorScheme="red" onClick={remove} w="100%">
          Delete
        </Button>
      </Stack>
    </Flex>
  );
};

export default ScriptForm;
