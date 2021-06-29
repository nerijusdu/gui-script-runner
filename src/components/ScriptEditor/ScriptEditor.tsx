import React, { useState } from 'react';
import shortid from 'shortid';
import { ScriptTask } from '../../models/scriptTask';
import storageService from '../../services/storageService';
import TaskList from '../TaskList';
import ScriptForm from './ScriptForm';

const ScriptEditor: React.FC = () => {
  const [, reload] = useState('');
  const [selectedTask, setSelectedTask] = useState<ScriptTask>();
  const tasksFromMemory = storageService.getTasks();
  return (
    <>
      <TaskList
        tasks={tasksFromMemory}
        onTaskSelect={setSelectedTask}
        selectedTaskId={selectedTask?.id}
        onAddClick={() => setSelectedTask(undefined)}
      />
      <ScriptForm
        task={selectedTask}
        onUpdate={() => {
          reload(shortid());
          setSelectedTask(undefined);
        }}
      />
    </>
  );
};

export default ScriptEditor;
