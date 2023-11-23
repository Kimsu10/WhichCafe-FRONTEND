// import { configureStore } from '@reduxjs/toolkit';
// import tokenReducer from './AuthStore';

// export default configureStore({
//   reducer: {
//     token: tokenReducer,
//   },
// });

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import tokenReducer, { tokenSlice } from './AuthStore';
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
});

export default store;
