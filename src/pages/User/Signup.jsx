import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Signup = ({ setIsRightOpen }) => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const [passwordError, setPasswordError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [inputValues, setInputValues] = useState({
    account: '',
    nickname: '',
    password: '',
    password2: '',
    question: '',
  });

  const accountRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{3,30}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,64})/;
  const validateAccount = accountRegex.test(inputValues.account);
  const validatePassword = passwordRegex.test(inputValues.password);

  const handleInputValue = e => {
    const { name, value } = e.target;
    setInputValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleBlur = e => {
    const { name, value } = e.target;

    if (name === 'password' && value.length > 0) {
      if (passwordRegex.test(value) === false) {
        alert(
          '비밀번호는 8~64자리로 하나이상의 영문,숫자,특수문자를 포함해야합니다.',
        );
      }
    }
  };

  const accountCheck = () => {
    if (accountRegex.test(inputValues.account)) {
      setIsValid(true);
      fetch(
        `${process.env.REACT_APP_API_URL}/users/duplicationCheck/${inputValues.account}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
        },
      )
        .then(res => {
          if (res.status === 200) {
            alert('사용가능한 id 입니다.');
          } else {
            alert('이미 존재하는 id입니다.');
          }
        })
        .catch(error => {
          console.error('통신 에러:', error);
        });
    } else {
      setIsValid(false);
      alert('ID는 3~30자리 영문+숫자로 조합해주세요.');
    }
  };

  useEffect(() => {
    const isPasswordMatch = inputValues.password === inputValues.password2;
    setPasswordError(!isPasswordMatch);

    const isQuestionValid = inputValues.question.includes('초등학교');

    const isAllInputsFilled =
      inputValues.account &&
      inputValues.nickname &&
      inputValues.password &&
      inputValues.password2 &&
      inputValues.question;

    setIsDisabled(
      !(
        isAllInputsFilled &&
        isPasswordMatch &&
        validateAccount &&
        validatePassword &&
        isQuestionValid
      ),
    );
  }, [inputValues, validateAccount, validatePassword]);

  const addUser = () => {
    if (!isValid) {
      alert('중복확인을 해주세요');
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },

        body: JSON.stringify({
          account: inputValues.account,
          nickname: inputValues.nickname,
          password: inputValues.password,
          question_answer: inputValues.question,
        }),
      })
        .then(res => {
          if (res.status === 201) {
            setIsRightOpen(false);
            alert('회원가입 성공');
            navigate('/');
          }
        })
        .catch(error => {
          console.error('통신 에러:', error);
          alert('개발자에게 문의해주세요');
        });
    }
  };

  return (
    <SignupBody>
      <SignupBox>
        <Logo>회원가입</Logo>
        <SignupForm>
          <AccountBox>
            <AccountInput
              name="account"
              value={inputValues.account}
              onChange={handleInputValue}
              placeholder="id를 입력해주세요"
              required
            />
            <CheckAccountBtn onClick={() => accountCheck()}>
              중복확인
            </CheckAccountBtn>
          </AccountBox>

          <NicknameInput
            name="nickname"
            value={inputValues.nickname}
            onChange={handleInputValue}
            placeholder="닉네임을 입력해주세요"
            required
          />

          <PasswordBox>
            <PasswordInput
              name="password"
              type={isPasswordVisible ? 'text' : 'password'}
              value={inputValues.password}
              onChange={handleInputValue}
              placeholder="비밀번호를 입력해주세요"
              required
              hasError={passwordError}
              onBlur={handleBlur}
            />
            <PasswordVisibieButton
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? '숨기기' : '보기'}
            </PasswordVisibieButton>
          </PasswordBox>
          <PasswordInput
            name="password2"
            type={isPasswordVisible ? 'text' : 'password'}
            value={inputValues.password2}
            onChange={handleInputValue}
            placeholder="비밀번호 재입력"
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

const AccountBox = styled.div`
  width: 100%;
  position: relative;
`;

const AccountInput = styled.input``;

const CheckAccountBtn = styled.button`
  width: 4.6em;
  height: 2.57em;
  color: ${props => props.theme.mainColor};
  position: absolute;
  top: 0;
  right: 10%;
  font-size: 0.9em;
  border: 1px solid #d5d5d5;
`;

const NicknameInput = styled.input``;

const PasswordBox = styled.div`
  width: 100%;
  position: relative;
`;

const PasswordInput = styled.input`
  border-color: ${props => (props.hasError ? 'red' : '#d5d5d5')};
`;

const PasswordVisibieButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  width: 4.6em;
  height: 2.57em;
  color: ${props => props.theme.mainColor};
  position: absolute;
  top: 0;
  right: 10%;
  font-size: 0.9em;
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
