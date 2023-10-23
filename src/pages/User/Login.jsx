import { useEffect, useState } from 'react';
import { styled, keyframes } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { SET_TOKEN } from '../../Store/AuthStore';
import { setRefreshToken } from '../../Storage/Cookie';
import { useDispatch } from 'react-redux';
import Signup from './Signup';

const fadeIn = keyframes`
from {
  opacity: 0;
  transform: translateX(30%);
}
to {
  opacity: 1;
  transform: translateX(0);
}
`;

const TestLogin = ({ setIsRightOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(true);
  const [changeModal, setChangeModal] = useState(false);

  const handleSignupClick = () => {
    setChangeModal(true);
  };

  const [inputValues, setInputValues] = useState({
    account: '',
    password: '',
  });

  const handleInputValue = e => {
    const { name, value } = e.target;
    setInputValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const loginUser = () => {
    fetch(`${process.env.REACT_APP_API_URL}/users/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        account: inputValues.account,
        password: inputValues.password,
      }),
    }).then(async res => {
      if (res.status === 200) {
        const data = await res.json();
        setRefreshToken(data.refresh_token);
        dispatch(SET_TOKEN(data.accessToken));
        return navigate('/');
      }
    });
  };

  useEffect(() => {
    setIsDisabled(!(inputValues.account && inputValues.password));
  }, [inputValues]);

  return (
    <BodyBox>
      <SlideBox>
        <LoginBox style={{ display: changeModal ? 'none' : 'block' }}>
          <ModalName>로그인</ModalName>
          <LoginForm>
            <AccountInput
              name="account"
              value={inputValues.account}
              onChange={handleInputValue}
              placeholder="ID를 입력해주세요"
              required
            />
            <PasswordInput
              name="password"
              type="password"
              value={inputValues.password}
              onChange={handleInputValue}
              placeholder="비밀번호를 입력해주세요"
              required
            />
            <LoginBtn name="loginBtn" onClick={loginUser} disabled={isDisabled}>
              로그인
            </LoginBtn>
            <ModalBox>
              <SignupBtn onClick={handleSignupClick}>회원가입</SignupBtn>
              <Link to="find">
                <FindBtn onClick={() => setIsRightOpen(false)}>
                  비밀번호 재설정
                </FindBtn>
              </Link>
            </ModalBox>
            <ToMain onClick={() => setIsRightOpen(false)}>돌아가기</ToMain>
          </LoginForm>
        </LoginBox>
        {changeModal && <Signup setIsRightOpen={setIsRightOpen} />}
      </SlideBox>
    </BodyBox>
  );
};

export default TestLogin;

const BodyBox = styled.div``;

const SlideBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em;
  height: 100vh;
  text-align: center;
  animation: ${fadeIn} 0.7s ease;
  color: ${props => props.theme.subColor};
`;

const LoginBox = styled.div`
  border: 1px solid ${props => props.theme.mainColor};
  background-color: ${props => props.theme.subColor};
  border-radius: 0.5em;
  padding: 1.5em;
  width: 25em;
  height: 25em;
  flex-direction: column;
  margin: 0 auto;
  text-align: center;
`;

const ModalName = styled.div`
  font-size: 2.4em;
  font-weight: 900;
  padding: 0.9em 0;
  color: ${props => props.theme.mainColor};
`;

const LoginForm = styled.div`
  display: grid;
  justify-items: center;
  grid-gap: 1em;
`;

const AccountInput = styled.input``;

const PasswordInput = styled.input``;

const LoginBtn = styled.button`
  width: 16em;
  height: 2.8em;
  border-radius: 0.5em;
  color: white;
  background-color: ${props => (props.disabled ? '#d0d0d0' : '#a6926b')};
`;

const ModalBox = styled.div`
  width: 16em;
  display: flex;
  justify-content: space-between;
`;

const SignupBtn = styled.button`
  font-size: 0.9em;
  color: ${props => props.theme.mainColor};
`;

const FindBtn = styled.button`
  font-size: 0.9em;
  color: ${props => props.theme.mainColor};
`;

const ToMain = styled.button`
  font-size: 0.9em;
  color: ${props => props.theme.mainColor};
  padding: 0;
`;
