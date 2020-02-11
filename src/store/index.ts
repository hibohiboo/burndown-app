import { configureStore, Action } from '@reduxjs/toolkit';
import persistState from 'redux-localstorage';
import { ThunkAction } from 'redux-thunk';
import rootReducer, { RootState } from './rootReducer'

const enhancers = [persistState(['tasks', 'sprints'], { key: 'burndown-app' })];

const store = configureStore({ reducer: rootReducer, enhancers });
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
