import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_TOKEN } from '../Store/AuthStore';
import { getCookieToken, removeCookieToken } from '../Storage/Cookie';
import { DELETE_TOKEN } from '../Store/AuthStore';

const useRefreshToken = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const token = useSelector(store => store.token.token.accessToken);
  const refreshToken = getCookieToken();
  const expiredTime = useSelector(store => store.token.token.expireTime);
  const currentTime = new Date().getTime();
  const fetchTime = expiredTime - currentTime;

  useEffect(() => {
    if (!refreshToken.refreshToken) {
      setLoading(false);
    } else if (
      (refreshToken.refreshToken && fetchTime < 60000) ||
      (refreshToken.refreshToken && fetchTime < 0)
    ) {
      const fetchData = async () => {
        setLoading(false);
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/users/refreshtoken`,
            {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
                refreshToken: `${refreshToken.refreshToken}`,
              },
              body: JSON.stringify({
                refreshToken: refreshToken.refreshToken,
              }),
            },
          );

          if (response.status === 200) {
            dispatch(DELETE_TOKEN());
            const data = await response.json();
            dispatch(SET_TOKEN(data.accessToken));
          } else if (response.status === 400) {
            console.log('Key Error');
          } else if (response.status === 401) {
            const errorData = await response.json();
            console.log(`Error: ${errorData.message}`);
          } else if (response.status === 500) {
            console.log('Invalid RefreshToken');
            removeCookieToken();
            dispatch(DELETE_TOKEN());
          }
        } catch (error) {
          console.error('Fail to get AccessToken :', error);
        }
      };
      fetchData();
    } else if (!refreshToken) {
      alert('다시 로그인 해주세요');
    }
  }, []);

  return loading;
};

export default useRefreshToken;
