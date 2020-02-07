import { configureStore } from '@reduxjs/toolkit';
import taskModule from '../modules/taskModule';
import sprintModule from '../modules/sprintModule';
import currentTaskModule from '../modules/currentTaskModule';

const reducer = { tasks: taskModule.reducer,
                  sprints: sprintModule.reducer,
                  currentTask: currentTaskModule.reducer,
                };

const store = configureStore({ reducer });

export default store;
