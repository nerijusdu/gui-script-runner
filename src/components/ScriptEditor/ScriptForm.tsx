import { CloseIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Input,
  Stack,
  Textarea,
  useToast,
  Text,
  InputGroup,
  InputRightElement,
  IconButton,
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
  const [argPresets, setArgPresets] = useState<string[]>(['']);
  const toast = useToast();

  useEffect(() => {
    setName(task?.name || '');
    setScript(task?.script || '');
    setArgPresets(task?.argPresets || ['']);
  }, [task]);

  const save = () => {
    const taskToSave = task || { id: shortid() };
    storageService.saveTask({
      ...taskToSave,
      name,
      script,
      argPresets: argPresets.filter((x) => !!x && !!x.length),
    });
    setName(task?.name || '');
    setScript(task?.script || '');
    setArgPresets(task?.argPresets || ['']);
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
    <Flex w="100%" justifyContent="center" mt={2}>
      <Flex w="100%" maxW="800px" flexDir="column" padding={2}>
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
          <Stack w="50%">
            <Text>Argument Presets:</Text>
            {argPresets.map((text, i) => (
              <InputGroup key={i}>
                <Input
                  placeholder={`Argument preset #${i + 1}`}
                  value={text}
                  onChange={(e) =>
                    setArgPresets((prev) => {
                      const newItems = [...prev];
                      newItems[i] = e.target.value;
                      return newItems;
                    })
                  }
                />
                <InputRightElement>
                  <IconButton
                    icon={<CloseIcon />}
                    aria-label="remove argument preset"
                    _hover={{ bg: 'transparent' }}
                    bg="transparent"
                    onClick={() =>
                      setArgPresets((prev) => [
                        ...prev.slice(0, i),
                        ...prev.slice(i + 1),
                      ])
                    }
                  />
                </InputRightElement>
              </InputGroup>
            ))}
            <Button
              colorScheme="cyan"
              onClick={() => setArgPresets((prev) => [...prev, ''])}
            >
              Add new preset
            </Button>
          </Stack>
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
    </Flex>
  );
};

export default ScriptForm;
