import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { Task } from '../@types/task';

export const initTask = {
  title: '',
  detail: '',
  id:0,
  point: 0,
  sprint: null,
  tag: 'draggable-gray',
  position: { x: 0, y: 0 },
};

// id auto increment
const getTaskIDHelper = (tasks:Task[]):number => (tasks.map(t=>t.id).reduce((prev, current)=> (prev > current ? prev : current), 0 ) + 1);

const initialState = [] as Task[];

// actions と reducers の定義
const taskModule = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.push({...action.payload, id: getTaskIDHelper(state)});
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const p = action.payload;
      return state.map(t=>t.id === p.id ? p : t); 
    },
    deleteTask: (state, action: PayloadAction<Task>) => state.filter((data) => (data.id !== action.payload.id)),
    addTasks: (state, action: PayloadAction<Task[]>) => action.payload,
  }
});

export const useTasks = () => {
  return useSelector((state: { tasks: ReturnType<typeof taskModule.reducer> }) => state.tasks);
}
export const useTask = (id: number) => {
  return useSelector((state: { tasks: ReturnType<typeof taskModule.reducer> }) => state.tasks.find(t=>t.id === id));
}

export default taskModule;
