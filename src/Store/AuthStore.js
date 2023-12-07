import { createSlice } from '@reduxjs/toolkit';

export const TOKEN_TIME_OUT = 3600 * 1000;

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    authenticated: false,
    accessToken: null,
    expireTime: null,
  },
  reducers: {
    SET_TOKEN: (state, action) => {
      state.authenticated = true;
      state.accessToken = action.payload;
      state.expireTime = new Date().getTime() + TOKEN_TIME_OUT;
    },
    DELETE_TOKEN: state => {
      state.authenticated = false;
      state.accessToken = null;
      state.expireTime = null;
    },
    CHECK_TOKEN_EXPIRED: state => {
      const currentTime = new Date().getTime();
      if (state.expireTime && currentTime > state.expireTime.getTime()) {
        state.authenticated = false;
        state.accessToken = null;
        state.expireTime = null;
      }
    },
  },
});

export const { SET_TOKEN, DELETE_TOKEN, CHECK_TOKEN_EXPIRATION } =
  tokenSlice.actions;

export default tokenSlice.reducer;
