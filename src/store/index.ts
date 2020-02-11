import { configureStore, Action } from '@reduxjs/toolkit';
import persistState from 'redux-localstorage';
import { ThunkAction } from 'redux-thunk';
import rootReducer, { RootState } from './rootReducer';
import storeState from '../firebase/storeState';
import { key, collectionName } from '../modules/userModule';

const enhancers: any[] = [
                  //  persistState(['tasks', 'sprints'], { key }),
                   storeState(['tasks', 'sprints', 'updatedUid'], { key, collectionName }),];

const store = configureStore({ reducer: rootReducer, enhancers });
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
