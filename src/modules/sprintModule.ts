import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import moment from 'moment';
import { Sprint } from '../@types/sprint';

// id auto increment
const getSprintIDHelper = (sprints:Sprint[]):number => sprints.length === 0 ? 0 : (sprints.map(t=>t.id).reduce((prev, current)=> (prev > current ? prev : current), 0 ) + 1);
export const latestSprints = (sprints: Sprint[]) => sprints.length === 0 ? null : sprints[sprints.length - 1];

const initialState = [] as Sprint[];

// actions と reducers の定義
const sprintModule = createSlice({
  name: "sprints",
  initialState,
  reducers: {
    addFirstSprint: (state, action: PayloadAction<string>) => {
      console.log(action.payload)
      state.push({
        id: getSprintIDHelper(state),
        start: action.payload,
        end: null,
        planningCapacity: 1,
        resultCapacity: 1,
        velocity: -1
      });
    },
    addSprint: (state, action: PayloadAction) => {
      const latest = latestSprints(state);
      if (latest === null) throw Error(`unexpected state`);
      console.log(latest)

      state.push({
        id: getSprintIDHelper(state),
        start: moment(latest.start).add(7, 'd').format('YYYY-MM-DD'),
        end: null,
        planningCapacity: 1,
        resultCapacity: 1,
        velocity: -1
      });
    },
    editSprint: (state, action: PayloadAction<Sprint>) => {
      const p = action.payload;
      return state.map(t=>t.id === p.id ? p : t); 
    },
    deleteLastSprint: (state, action: PayloadAction) => {
      state.pop();
    }
  }
});

export default sprintModule;

export const useSprints = () => {
  return useSelector((state: { sprints: ReturnType<typeof sprintModule.reducer> }) => state.sprints);
}

export const useLatestSprints = () => {
  return useSelector((state: { sprints: ReturnType<typeof sprintModule.reducer> }) => latestSprints(state.sprints));
}

export const calcNormarizedVelocity = (sprint: Sprint) => {
  if (sprint.velocity < 0) throw new Error(`unexpected args. velocity: ${sprint.velocity}.`);
  if (!sprint.resultCapacity) return sprint.velocity;

  return Math.round(sprint.velocity / sprint.resultCapacity);
};

// Average velocity of the last 3 sprints
const latestNumber = 3;
export const calcVelocityAverage = (sprints: Sprint[]): number => { 
  const latests = sprints.filter(s=>s.velocity > -1).slice(-latestNumber);

  if (latests.length === 0) {
    return 0;
  }
  const sum = latests.map(calcNormarizedVelocity).reduce((sum, n) => sum + n, 0);
  return Math.round(sum / latests.length);
};


export const calcPlanningPoint = (sprints: Sprint[]) => {
  const latests = sprints.slice(-latestNumber);
  if (latests.length === 0) {
    return 0;
  }
  const average = calcVelocityAverage(latests);
  const capacity = latests[latests.length-1].planningCapacity;
  return Math.round(average * capacity);
};
