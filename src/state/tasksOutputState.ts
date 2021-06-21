import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import { ConsoleLine } from '../models/consoleLine';

const tasksOutputState = atom<{ [key: string]: ConsoleLine[] }>({
  key: 'tasksOutput',
  default: {},
});

export const useTaskOutput = (taskId?: string) => {
  const tasksOutput = useRecoilValue(tasksOutputState);
  return !taskId ? [] : tasksOutput[taskId] || [];
};

export const useSetTaskOutputLine = () => {
  const setTaskOuput = useSetRecoilState(tasksOutputState);

  const addNewLine = (taskId: string, line: ConsoleLine) =>
    setTaskOuput((prev) => {
      const newValues = { ...prev };
      newValues[taskId] = [...(prev[taskId] || []), line];
      return newValues;
    });

  const clearLines = (taskId: string) =>
    setTaskOuput((prev) => {
      const newValues = { ...prev };
      newValues[taskId] = [];
      return newValues;
    });

  return { addNewLine, clearLines };
};

export default tasksOutputState;
