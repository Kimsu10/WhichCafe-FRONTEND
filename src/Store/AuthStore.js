import { createSlice } from '@reduxjs/toolkit';

export const TOKEN_TIME_OUT = 600 * 1000;

//createSlice: redux action과 전체 슬라이스에 대한 reducer를 선언할수 있게 해줌.
export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    authenticated: false,
    accessToken: null,
    expireTime: null,
  },
  reducers: {
    SET_TOKEN: (state, action) => {
      state.authenticated = true; //현재 로그인 여부
      state.accessToken = action.payload; // Access Token 저장.
      state.expireTime = new Date().getTime() + TOKEN_TIME_OUT; //Access Token 만료 시간.
    },
    DELETE_TOKEN: state => {
      state.authenticated = false;
      state.accessToken = null;
      state.expireTime = null;
    },
  },
});

export const { SET_TOKEN, DELETE_TOKEN } = tokenSlice.actions;

export default tokenSlice.reducer;
/**
 * SET_TOKEN: Access Token 정보를 저장.
 * DELETE_TOKEN: 값을 모두 초기화. Access Token에 대한 정보도 삭제.
 */
