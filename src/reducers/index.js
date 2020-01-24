import {
  EDIT_TASK, DELETE_TASK, ADD_TASK, EDIT_VELOCITY, ADD_SPRINT,
  DELETE_SPRINT, UPDATE_DATA,
} from '../constants/action-types';
import { initialData, initialState } from '../constants/initial-state';

const init = initialState;

// taskの配列にidを振りなおすヘルパー関数
const setTaskIDHelper = (array) => Object.assign([], array.map((data, index) => {
  const id = index + 1;
  return { ...data, id: `data${id}` };
}));

function rootReducer(state = init, action) {
  // タスク編集時
  if (action.type === EDIT_TASK) {
    return {
      ...state,
      datas: Object.assign([], state.datas.map((data) => {
        if (data.id === action.payload.id) {
          return { ...data, ...action.payload };
        }
        return data;
      })),
    };
  }

  // タスク削除時
  if (action.type === DELETE_TASK) {
    return {
      ...state,
      datas: setTaskIDHelper(state.datas.filter((data) => (data.id !== action.payload.id))),
    };
  }

  // タスク追加時
  if (action.type === ADD_TASK) {
    return {
      ...state,
      datas: setTaskIDHelper(state.datas.concat(initialData)),
    };
  }

  // velocity編集時
  if (action.type === EDIT_VELOCITY) {
    return {
      ...state,
      sprints: Object.assign([], state.sprints.map((sprint) => {
        if (sprint.id === action.payload.id) {
          return { ...sprint, ...action.payload };
        }
        return sprint;
      })),
    };
  }

  // sprint追加時
  if (action.type === ADD_SPRINT) {
    return {
      ...state,
      sprints: Object.assign([], state.sprints.concat({
        id: `id${state.sprints.length + 1}`,
        start: '',
        end: '',
        planningCapacity: '0',
        resultCapacity: '0',
        velocity: '',
      })),
    };
  }

  // sprint削除時
  if (action.type === DELETE_SPRINT) {
    return {
      ...state,
      sprints: Object.assign([], state.sprints.slice(0, state.sprints.length - 1)),
    };
  }
  if (action.type === UPDATE_DATA) {
    console.log('udpate', action.payload);
    return {
      ...state,
      sprints: action.payload.sprints.map((x) => x),
      datas: action.payload.datas.map((x) => x),
    };
  }

  // 初期表示
  return state;
}

export default rootReducer;
