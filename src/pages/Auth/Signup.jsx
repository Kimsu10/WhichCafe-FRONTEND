import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const Signup = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const [inputValues, setInputValues] = useState({
    account: '',
    password: '',
    password2: '',
  });

  const handleInputValue = e => {
    const { name, value } = e.target;
    setInputValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    setIsDisabled(
      !(inputValues.account && inputValues.password && inputValues.password2),
    );
  }, [inputValues]);

  return (
    <SignupBody>
      <SignupBox>
        <Logo>회원가입</Logo>
        <SignupForm>
          <AccountInput
            name="account"
            value={inputValues.account}
            onChange={handleInputValue}
            placeholder="사용할 id를 입력해주세요"
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
          <PasswordInput
            name="password2"
            type="password"
            value={inputValues.password2}
            onChange={handleInputValue}
            placeholder="비밀번호를 다시 입력해주세요"
            required
          />
          <SignupBtn
            name="signupBtn"
            onClick={() => {
              navigate('/');
            }}
            disabled={isDisabled}
          >
            회원가입
          </SignupBtn>
          <Link to="/">
            <ToMain>메인으로</ToMain>
          </Link>
        </SignupForm>
      </SignupBox>
    </SignupBody>
  );
};

export default Signup;

const SignupBody = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
`;

const SignupBox = styled.div`
  border: 1px solid black;
  border-radius: 0.5em;
  padding: 1.5em;
  width: 25em;
  height: 25em;
  flex-direction: column;
  margin: 0 auto;
  text-align: center;
`;

const Logo = styled.div`
  font-size: 2.5em;
  font-weight: 900;
  padding: 1em 0;
  color: black;
`;

const SignupForm = styled.div`
  display: grid;
  justify-items: center;
  grid-gap: 0.6em;
`;

const AccountInput = styled.input``;

const PasswordInput = styled.input``;

const SignupBtn = styled.button`
  margin: 10px 0;
  width: 16em;
  height: 2.8em;
  border-radius: 0.5em;
  color: white;
  background-color: ${props => (props.disabled ? '#d0d0d0' : '#0099ff')};
`;

const ToMain = styled.p`
  font-size: 0.8em;
`;
