import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { Sprint } from '../@types/sprint';

// id auto increment
const getSprintIDHelper = (sprints:Sprint[]):number => sprints.length === 0 ? 0 : (sprints.map(t=>t.id).reduce((prev, current)=> (prev > current ? prev : current), 0 ) + 1);

const initialState = [] as Sprint[];

// actions と reducers の定義
const sprintModule = createSlice({
  name: "sprints",
  initialState,
  reducers: {
    addSprint: (state, action: PayloadAction<Sprint>) => {
      state.push({
        id: getSprintIDHelper(state),
        start: null,
        end: null,
        planningCapacity: 0,
        resultCapacity: 0,
        velocity: -1
      });
    },
    editSprint: (state, action: PayloadAction<Sprint>) => {
      const p = action.payload;
      return state.map(t=>t.id === p.id ? p : t); 
    },
    deleteSprint: (state, action: PayloadAction<Sprint>) => state.filter((data) => (data.id !== action.payload.id)),
  }
});

export const useSprints = () => {
  return useSelector((state: { sprints: ReturnType<typeof sprintModule.reducer> }) => state.sprints);
}

export default sprintModule;
