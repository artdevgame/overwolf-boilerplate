import { logger } from 'redux-logger';
import { createStateSyncMiddleware, withReduxStateSync } from 'redux-state-sync';

import { combineReducers, configureStore, Middleware } from '@reduxjs/toolkit';

import { overwolfReducer } from './slices/overwolfSlice';
import { settingsReducer } from './slices/settingsSlice';

const rootReducer = combineReducers({
  overwolf: overwolfReducer,
  settings: settingsReducer,
});

const middlewares: Middleware[] = [createStateSyncMiddleware({})];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(...middlewares),
  reducer: withReduxStateSync(rootReducer),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type Store = typeof store;
