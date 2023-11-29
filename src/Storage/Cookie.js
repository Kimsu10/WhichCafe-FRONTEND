// import { Cookies } from 'react-cookie';

// const cookies = new Cookies();

// export const setRefreshToken = refreshToken => {
//   const today = new Date();
//   const expireDate = today.setDate(today.getDate() + 14);

//   return cookies.set('refreshToken', refreshToken, {
//     sameSite: 'strict',
//     path: '/',
//     expires: new Date(expireDate),
//   });
// };

// export const getCookieToken = () => {
//   const refreshToken = cookies.get('refreshToken');
//   return { refreshToken };
// };

// export const removeCookieToken = () => {
//   return cookies.remove('refreshToken', { sameSite: 'strict', path: '/' });
// };

import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setRefreshToken = refreshToken => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 14);

  return cookies.set('refreshToken', refreshToken, {
    sameSite: 'None',
    secure: true,
    expires: new Date(expireDate),
  });
};

export const getCookieToken = () => {
  const refreshToken = cookies.get('refreshToken');
  return { refreshToken };
};

export const removeCookieToken = () => {
  return cookies.remove('refreshToken', {
    sameSite: 'None',
    secure: true,
    path: '/',
  });
};
