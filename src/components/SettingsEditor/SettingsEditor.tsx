import { Button, Flex, Input, Stack, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import storageService from '../../services/storageService';

const SettingsEditor: React.FC = () => {
  const [shell, setShell] = useState('');
  const toast = useToast();

  useEffect(() => {
    const settings = storageService.getSettings(true);
    setShell(settings?.shell || '');
  }, []);

  const save = () => {
    storageService.saveSettings({
      shell,
    });
    toast({
      title: 'Saved!',
      status: 'success',
    });
  };

  return (
    <Flex w="100%" justifyContent="center" mt={2}>
      <Flex w="100%" maxW="800px" flexDir="column" padding={2}>
        <Stack pb={4}>
          <Input
            placeholder="Shell to use for running scripts"
            value={shell}
            onChange={(e) => setShell(e.target.value)}
          />
        </Stack>
        <Stack direction="row-reverse" align="center">
          <Button colorScheme="green" onClick={save}>
            Save
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default SettingsEditor;
