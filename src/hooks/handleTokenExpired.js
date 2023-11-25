// import {
//   setRefreshToken,
//   getCookieToken,
//   removeCookieToken,
// } from '../Storage/Cookie';
// import { CHECK_TOKEN_EXPIRATION, SET_TOKEN } from '../Store/AuthStore';

// export const handleTokenExpired = () => async (dispatch, getState) => {
//   dispatch(CHECK_TOKEN_EXPIRATION);
//   const { token } = getState();

//   if (!token.authenticated) {
//     await refreshAccessToken(dispatch, token.accessToken);
//   }
// };

// export const refreshAccessToken = async (dispatch, accessToken) => {
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
//       // setRefreshToken(data.refreshToken);
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
