import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getCookieToken } from '../../Storage/Cookie';
import Warning from './Withdraw';

const Mypage = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [isWarning, setIsWarning] = useState(false);
  const [isWithdrawBtn, setIsWithdrawBtn] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [passwordError, setPasswordError] = useState(true);
  const [inputValues, setInputValues] = useState({
    nickName: '',
    password: '',
    password2: '',
  });

  const token = useSelector(store => store.token.token.accessToken);
  const { refreshToken } = getCookieToken();
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,64})/;

  const handleInputValue = e => {
    const { name, value } = e.target;
    setInputValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    const nothingChanged = Object.values(inputValues).every(
      value => value === '',
    );
    const isPasswordMatch = inputValues.password === inputValues.password2;
    setIsDisabled(!isPasswordMatch || nothingChanged);
    setPasswordError(!isPasswordMatch);
  }, [inputValues]);

  const handleWithdrawClick = () => {
    setIsWarning(isWarning => {
      if (!isWarning) {
        setIsWithdrawBtn(false);
        return true;
      } else if (isWarning) {
        setIsWithdrawBtn(true);
        return false;
      }
    });
  };

  useEffect(() => {
    if (!refreshToken) {
      alert('로그인이 필요합니다');
      navigate('/');
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/users/mypage`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: `Bearer ${token}`,
        },
      })
        .then(async res => {
          const data = await res.json();
          if (res.status === 200) {
            setUserData(data);
          } else if (data.message === 'Token expired. Please refresh token') {
            alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
            navigate('/');
          } else if (data.message === 'GET_USER_BY_ACCOUNT_ERROR') {
            alert('정보 불러오기 실패: 개발자에게 문의해주세요');
          }
        })
        .catch(error => {
          console.error('통신 에러:', error);
          alert('정보 불러오기 실패');
        });
    }
  }, []);

  const handleSaveProfile = () => {
    if (passwordRegex.test(inputValues.password) === false) {
      alert(
        '비밀번호 양식이 틀립니다. 8~64자리로 하나이상의 영문,숫자,특수문자를 포함해야합니다',
      );
    } else {
      try {
        fetch(`${process.env.REACT_APP_API_URL}/users/mypage`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nickname: inputValues.nickName,
            password: inputValues.password,
          }),
        }).then(async res => {
          if (res.status === 200) {
            alert('비밀번호 변경 성공');
            navigate('/mypage');
          } else if (res.status === 400) {
            alert('입력한 정보를 다시 확인해주세요.');
          } else if (res.status === 401) {
            alert('토큰 만료: 다시 로그인 해주세요.');
          } else if (res.status === 500) {
            alert('수정 실패: 개발자에게 문의하세요.');
          }
        });
      } catch (error) {
        console.error(error);
        alert('정보 수정 실패');
      }
    }
  };

  return (
    <MypageBody>
      <ProfileName>{userData?.nickname} 님의 프로필</ProfileName>
      <UserDataBody>
        <AccountBox>
          계정(account)
          <UserAccount> {userData?.account}</UserAccount>
        </AccountBox>
        <NickNameBox>
          닉넴임(NickName)
          <UserNickName>
            <InputNick
              placeholder={userData?.nickname || ''}
              name="nickName"
              onChange={handleInputValue}
            />
          </UserNickName>
        </NickNameBox>
        <PasswordBox>
          비밀번호( 영문+숫자+ 특수기호 8자리 이상)
          <UserPassword>
            <ChangePassword
              placeholder="변경할 비밀번호를 입력해주세요"
              name="password"
              onChange={handleInputValue}
              hasError={passwordError}
            />
            <ChangePassword
              placeholder="동일한 비밀번호를 입력해주세요"
              name="password2"
              onChange={handleInputValue}
              hasError={passwordError}
            />
          </UserPassword>
        </PasswordBox>
        <QuestionBox>
          나의 출신 초등학교이름은?
          <PasswordAnswer>{userData?.question_answer}</PasswordAnswer>
        </QuestionBox>
        <SubmitBtn onClick={handleSaveProfile} disabled={isDisabled}>
          수정하기
        </SubmitBtn>
        {isWarning && <Warning setIsWarning={handleWithdrawClick} />}
      </UserDataBody>
      <Link to="/">
        <GotoMain>돌아가기</GotoMain>
      </Link>
      {isWithdrawBtn && (
        <Withdraw onClick={handleWithdrawClick}>회원탈퇴</Withdraw>
      )}
    </MypageBody>
  );
};

export default Mypage;

// 공통되는 css 부분을 나중에 style로 다 빼버리자.
const MypageBody = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 768px;
  height: 100vh;
  background-color: #f7f0e0c9;
  margin: 0 auto;
  border-top: 1px solid #efeae0;
  padding: 2em;
  font-size: 19px;
  gap: 2em;
`;

const AccountBox = styled.div``;

const ProfileName = styled.h1`
  color: ${props => props.theme.mainColor};
`;

const UserDataBody = styled.div`
  width: 530px;
  height: 550px;
  padding: 1em 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #faf9f1;
  border: 1px solid #a6926b;
  border-radius: 0.7em;
  gap: 30px;
  position: relative;
`;

const UserAccount = styled.h3`
  padding: 0.3em 1em;
`;
const NickNameBox = styled.div``;

const UserNickName = styled.h3``;

const InputNick = styled.input`
  border: none;
  width: 9em;
`;

const PasswordBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const UserPassword = styled.div`
  width: 20em;
`;

const ChangePassword = styled.input`
  border-color: ${props => (props.hasError ? 'red' : '#a6926b')};
  margin: 3px 0;
  width: 20em;
`;

const QuestionBox = styled.div``;

const PasswordAnswer = styled.h3`
  padding-left: 1em;
  font-weight: 400;
`;

const CheckNicknameBtn = styled.button`
  font-size: 18px;
  color: ${props => props.theme.mainColor};
  border-radius: 0.5em;
  margin-left: 1.1em;
`;

const SubmitBtn = styled.button`
  width: 20em;
  background-color: ${props => (props.disabled ? '#d0d0d0' : '#a6926b')};
  border-radius: 0.5em;
`;

const GotoMain = styled.button`
  font-size: 20px;
  font-weight: 700;
  height: 100%;
  padding: 0.5em 1em;
  color: ${props => props.theme.mainColor};
`;

const Withdraw = styled.button`
  color: red;
  font-size: 19px;
`;
