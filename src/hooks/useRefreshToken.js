// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import { getCookieToken, removeCookieToken } from '../Storage/Cookie';
// import { DELETE_TOKEN, SET_TOKEN } from '../Store/AuthStore';

// export function useCheckToken(key) {
//   const [isAuth, setIsAuth] = useState('Loaded');
//   const { authenticated, expireTime } = useSelector(state => state.token);
//   const refreshToken = getCookieToken();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const checkAuthToken = async () => {
//       if (refreshToken === undefined) {
//         dispatch(DELETE_TOKEN());
//         setIsAuth('Failed');
//       } else {
//         if (authenticated && new Date().getTime() < expireTime) {
//           setIsAuth('Success');
//         } else {
//           const response = await fetch(
//             `${process.env.REACT_APP_API_URL}/users/refreshToken`,
//             {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json;charset=utf-8',
//                 authorizatino: refreshToken,
//               },
//             },
//           );

//           if (response.status === 200) {
//             const token = (await response.json()).access_token;
//             dispatch(SET_TOKEN({ token }));
//             setIsAuth('Success');
//           } else {
//             dispatch(DELETE_TOKEN());
//             removeCookieToken();
//             setIsAuth('Failed');
//           }
//         }
//       }
//     };

//     checkAuthToken();
//   }, [refreshToken, dispatch, key]);

//   return {
//     isAuth,
//   };
// }
