import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setRefreshToken = refreshToken => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 7);

  return cookies.set('refreshToken', refreshToken, {
    sameSite: 'strict',
    path: '/',
    expires: new Date(expireDate),
  });
};

export const getCookieToken = () => {
  const refreshToken = cookies.get('refreshToken');
  return { refreshToken };
};

export const removeCookieToken = () => {
  return cookies.remove('refreshToken', { sameSite: 'strict', path: '/' });
};
/**
 * setRefreshToken: Refresh Token을 Cookie에 저장.
 * getCookieToken: Cookie에 저장된 Refresh Token 값을 갖고오기위한 함수.
 * removeCookieToken: 로그아웃시 Cookie 삭제.
 */
