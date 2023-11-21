import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCookieToken, removeCookieToken } from './storage/Cookie';
import { DELETE_TOKEN, SET_TOKEN } from '../store/Auth';
import jwt_decode from 'jwt-decode';

export function CheckToken() {
  const [isAuth, setIsAuth] = useState('Loaded');
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  console.log(token);

  const { refreshToken } = getCookieToken();

  const requestNewToken = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/refreshtoken`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${refreshToken}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        const accessToken = data.accessToken;
        dispatch(SET_TOKEN(accessToken));
        return accessToken;
      } else {
        throw new Error('Failed to request new access token');
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const checkAuthToken = async () => {
      if (refreshToken === undefined) {
        dispatch(DELETE_TOKEN());
        setIsAuth('Failed');
      } else {
        const decodedAccessToken = jwt_decode(refreshToken);
        const currentTime = Date.now();

        if (decodedAccessToken.exp * 1000 < currentTime) {
          const accessToken = await requestNewToken();

          if (accessToken) {
            setIsAuth('Success');
          } else {
            dispatch(DELETE_TOKEN());
            removeCookieToken();
            setIsAuth('Failed');
          }
        } else {
          setIsAuth('Success');
        }
      }
    };
    checkAuthToken();
  }, [refreshToken, dispatch]);

  return {
    isAuth,
  };
}
