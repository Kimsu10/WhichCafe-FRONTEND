import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Signup = ({ setIsRightOpen }) => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const [passwordError, setPasswordError] = useState(false);
  const [inputValues, setInputValues] = useState({
    account: '',
    nickname: '',
    password: '',
    password2: '',
    question: '',
  });

  const handleInputValue = e => {
    const { name, value } = e.target;
    setInputValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    const isPasswordMatch = inputValues.password === inputValues.password2;
    const isAllInputsFilled =
      inputValues.account &&
      inputValues.nickname &&
      inputValues.password &&
      inputValues.password2 &&
      inputValues.question;

    setIsDisabled(!(isAllInputsFilled && isPasswordMatch));
    setPasswordError(!isPasswordMatch);
  }, [inputValues]);

  const addUser = () => {
    fetch(`${process.env.REACT_APP_API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        account: inputValues.account,
        nickname: inputValues.nickname,
        password: inputValues.password,
        question: inputValues.question,
      }),
    }).then(res => {
      if (res.status === 200) {
        navigate('/login');
      }
    });
  };

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
          <NicknameInput
            name="nickname"
            value={inputValues.nickname}
            onChange={handleInputValue}
            placeholder="사용할 닉네임을 입력해주세요"
            required
          />
          <PasswordInput
            name="password"
            type="password"
            value={inputValues.password}
            onChange={handleInputValue}
            placeholder="비밀번호를 입력해주세요"
            required
            hasError={passwordError}
          />
          <PasswordInput
            name="password2"
            type="password"
            value={inputValues.password2}
            onChange={handleInputValue}
            placeholder="비밀번호를 다시 입력해주세요"
            required
            hasError={passwordError}
          />
          <QuestionInput
            name="question"
            value={inputValues.question}
            onChange={handleInputValue}
            placeholder="내가 졸업한 초등학교의 이름은?"
            required
          />
          <SignupBtn
            name="signupBtn"
            onClick={() => {
              addUser();
            }}
            disabled={isDisabled}
          >
            회원가입
          </SignupBtn>
          <ToMain onClick={() => setIsRightOpen(false)}>메인으로</ToMain>
        </SignupForm>
      </SignupBox>
    </SignupBody>
  );
};

export default Signup;

const SignupBody = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  margin: 0 auto;
  border-top: 1px solid #efeae0;
`;

const SignupBox = styled.div`
  border: 1px solid ${props => props.theme.mainColor};
  background-color: ${props => props.theme.subColor};
  border-radius: 0.5em;
  padding: 1.5em;
  width: 25em;
  height: 31em;
  flex-direction: column;
  margin: 0 auto;
  text-align: center;
`;

const Logo = styled.div`
  font-size: 2.4em;
  font-weight: 900;
  padding: 0.7em 0;
  color: ${props => props.theme.mainColor};
`;

const SignupForm = styled.div`
  display: grid;
  justify-items: center;
  grid-gap: 0.6em;
`;

const AccountInput = styled.input``;

const NicknameInput = styled.input``;

const PasswordInput = styled.input`
  border-color: ${props => (props.hasError ? 'red' : '#d5d5d5')};
`;

const QuestionInput = styled.input``;

const SignupBtn = styled.button`
  margin: 10px 0;
  width: 16em;
  height: 2.8em;
  border-radius: 0.5em;
  color: white;
  background-color: ${props => (props.disabled ? '#d0d0d0' : '#a6926b')};
`;

const ToMain = styled.button`
  font-size: 0.9em;
  color: ${props => props.theme.mainColor};
  padding: 0;
`;
