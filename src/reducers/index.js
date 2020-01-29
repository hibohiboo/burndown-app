import produce from 'immer';
import {
  EDIT_TASK, DELETE_TASK, ADD_TASK, EDIT_VELOCITY, ADD_SPRINT,
  DELETE_SPRINT, UPDATE_DATA, INIT_USER,
} from '../constants/action-types';
import { initialData, initialState } from '../constants/initial-state';

const init = initialState;

// taskの配列にidを振りなおすヘルパー関数
const setTaskIDHelper = (array) => Object.assign([], array.map((data, index) => {
  const id = index + 1;
  return { ...data, id: `data${id}` };
}));

const rootReducer = produce((draft = init, action) => {
  if (draft.loginUser) {
    draft.updatedUid = draft.loginUser.uid;
  }

  // タスク編集時
  if (action.type === EDIT_TASK) {
    draft.datas = draft.datas.map((data) => {
      if (data.id === action.payload.id) {
        return { ...data, ...action.payload };
      }
      return data;
    });
    return draft;
  }

  // タスク削除時
  if (action.type === DELETE_TASK) {
    draft.datas = setTaskIDHelper(draft.datas.filter((data) => (data.id !== action.payload.id)));
    return draft;
  }

  // タスク追加時
  if (action.type === ADD_TASK) {
    draft.datas = setTaskIDHelper(draft.datas.concat(initialData));
    return draft;
  }

  // velocity編集時
  if (action.type === EDIT_VELOCITY) {
    draft.sprints = draft.sprints.map((sprint) => {
      if (sprint.id === action.payload.id) {
        return { ...sprint, ...action.payload };
      }
      return sprint;
    });
    return draft;
  }

  // sprint追加時
  if (action.type === ADD_SPRINT) {
    draft.sprints = draft.sprints.concat({
      id: draft.sprints.map((x) => x.id).reduce((max, cur) => Math.max(max, cur), 0) + 1,
      start: '',
      end: '',
      planningCapacity: '0',
      resultCapacity: '0',
      velocity: '',
    });
  }
  // sprint削除時
  if (action.type === DELETE_SPRINT) {
    draft.sprints = draft.sprints.slice(0, draft.sprints.length - 1);
    return draft;
  }
  // firestoreからデータ読込時
  if (action.type === UPDATE_DATA) {
    const { sprints, datas, updatedUid } = action.payload;
    draft.sprints = sprints;
    draft.datas = datas;
    draft.updatedUid = updatedUid;
    return draft;
  }

  // ログインユーザのUIDを保存
  if (action.type === INIT_USER) {
    const { uid } = action.payload;
    draft.loginUser = { uid };
    draft.updateUid = uid;
    return draft;
  }

  // 初期表示
  return draft;
});

export default rootReducer;
