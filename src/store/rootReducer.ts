import { combineReducers } from '@reduxjs/toolkit';
import taskModule from '../modules/taskModule';
import sprintModule from '../modules/sprintModule';
import currentTaskModule from '../modules/currentTaskModule';
import userModule from '../modules/userModule';
import updatedUidModule from '../modules/updatedUidModule';

const rootReducer = combineReducers({ 
                  tasks: taskModule.reducer,
                  sprints: sprintModule.reducer,
                  currentTask: currentTaskModule.reducer,
                  user: userModule.reducer,
                  updatedUid: updatedUidModule.reducer, 
                });
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;