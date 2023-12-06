import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { tokenSlice } from './AuthStore';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const reducers = combineReducers({
  token: tokenSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage: storage,
  whiteList: ['token'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: {
    token: persistedReducer,
  },
  middleware: getDefaultMiddleware().concat(logger),
});

export default store;
