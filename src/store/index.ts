import { configureStore } from '@reduxjs/toolkit';
import persistState from 'redux-localstorage';
import taskModule from '../modules/taskModule';
import sprintModule from '../modules/sprintModule';
import currentTaskModule from '../modules/currentTaskModule';
import userModule from '../modules/userModule';

const reducer = { tasks: taskModule.reducer,
                  sprints: sprintModule.reducer,
                  currentTask: currentTaskModule.reducer,
                  user: userModule.reducer,
                };

const enhancers = [persistState(['tasks', 'sprints'], { key: 'burndown-app' })];

const store = configureStore({ reducer, enhancers });

export default store;
