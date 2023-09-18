import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
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

  useEffect(() => {
    setIsDisabled(!(inputValues.account && inputValues.password));
  }, [inputValues]);

  return (
    <BodyBox>
      <LoginBox>
        <Logo>카페어디</Logo>
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
          <LoginBtn
            name="loginBtn"
            onClick={() => navigate('/')}
            disabled={isDisabled}
          >
            로그인
          </LoginBtn>
          <Link to="/signup">
            <SignupBtn>회원가입</SignupBtn>
          </Link>
          <Link to="/">
            <ToMain>메인으로</ToMain>
          </Link>
        </LoginForm>
      </LoginBox>
    </BodyBox>
  );
};

export default Login;

const BodyBox = styled.div`
  display: flex;
  width: 768px;
  height: 100vh;
  align-items: center;
  background-color: #f7f0e0c9;
  margin: 0 auto;
  border-top: 1px solid #efeae0;
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

const Logo = styled.div`
  font-size: 2.4em;
  font-weight: 900;
  padding: 1em 0;
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

const SignupBtn = styled.button`
  font-size: 0.9em;
  color: ${props => props.theme.mainColor};
`;

const ToMain = styled.p`
  font-size: 0.9em;
  color: ${props => props.theme.mainColor};
`;
