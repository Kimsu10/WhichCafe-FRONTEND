import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHECK_TOKEN_EXPIRATION, SET_TOKEN } from '../Store/AuthStore';
import { getCookieToken } from '../Storage/Cookie';

const useRefreshToken = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const token = useSelector(store => store.token.token.accessToken);
  const refreshToken = getCookieToken();
  const expiredTime = useSelector(store => store.token.token.expireTime);
  const currentTime = new Date().getTime();
  const willFetch = expiredTime - currentTime < 60000;

  console.log(expiredTime);
  console.log(token);
  console.log(currentTime);

  useEffect(() => {
    if (willFetch) {
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
            const data = await response.json();
            dispatch(SET_TOKEN(data.accessToken));
            // setRefreshToken(data.refreshToken);
          } else {
            alert('토큰 재요청 실패');
            // dispatch(DELETE_TOKEN);
            // removeCookieToken();
          }
        } catch (error) {
          console.error('AccessToken 발급 오류:', error);
          // dispatch(DELETE_TOKEN);
          // removeCookieToken();
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
