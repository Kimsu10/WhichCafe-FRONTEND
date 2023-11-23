// import {
//   setRefreshToken,
//   getCookieToken,
//   removeCookieToken,
// } from '../Storage/Cookie';
import { createSlice } from '@reduxjs/toolkit';

// export const TOKEN_TIME_OUT = 600 * 2000;

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    authenticated: false,
    accessToken: null,
    expireTime: null,
    account: null,
  },
  reducers: {
    SET_TOKEN: (state, action) => {
      state.authenticated = true;
      state.accessToken = action.payload;
      state.expireTime = new Date(action.payload.exp * 1000);
      state.account = action.payload.account;
    },
    DELETE_TOKEN: state => {
      state.authenticated = false;
      state.accessToken = null;
      state.expireTime = null;
      state.account = null;
    },
    CHECK_TOKEN_EXPIRATION: state => {
      const currentTime = new Date().getTime();
      if (state.expireTime && currentTime > state.expireTime.getTime()) {
        state.authenticated = false;
        state.accessToken = null;
        state.expireTime = null;
        state.account = null;
      }
    },
  },
});

export const { SET_TOKEN, DELETE_TOKEN, CHECK_TOKEN_EXPIRATION } =
  tokenSlice.actions;

export const accessToken = state => state.token.accessToken;
export const expireTime = state => state.token.expireTime;
export const account = state => state.token.account;

// export const handleTokenExpiration = () => async (dispatch, getState) => {
//   dispatch(CHECK_TOKEN_EXPIRATION);
//   const { token } = getState();

//   if (!token.authenticated) {
//     await refreshAccessToken(dispatch, token.accessToken);
//   }
// };

// const refreshAccessToken = async (dispatch, accessToken) => {
//   try {
//     const response = await fetch(
//       `${process.env.REACT_APP_API_URL}/users/refreshtoken`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: accessToken,
//         },
//       },
//     );

//     if (response.ok) {
//       const data = await response.json();
//       dispatch(SET_TOKEN(data.accessToken));
//       setRefreshToken(data.refreshToken);
//     } else {
//       alert('토큰 재요청 실패');
//       // dispatch(DELETE_TOKEN);
//       // removeCookieToken();
//     }
//   } catch (error) {
//     console.error('AccessToken 발급 오류:', error);
//     // dispatch(DELETE_TOKEN);
//     // removeCookieToken();
//   }
// };

export default tokenSlice.reducer;
