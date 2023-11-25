import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHECK_TOKEN_EXPIRATION, SET_TOKEN } from '../Store/AuthStore';
import { getCookieToken } from '../Storage/Cookie';
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
    if (!refreshToken) {
      setLoading(false);
    } else if (fetchTime < 60000 || fetchTime < 0) {
      const fetchData = async () => {
        setLoading(false);
        try {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/users/refreshtoken`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
              },
            },
          );

          if (response.ok) {
            dispatch(DELETE_TOKEN());
            const data = await response.json();
            console.log(data);
            dispatch(SET_TOKEN(data.accessToken));
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
