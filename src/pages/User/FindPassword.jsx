import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FindPassword = () => {
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [inputValues, setInputValues] = useState({
    account: '',
    answer: '',
    password: '',
    password2: '',
  });

  const token = useSelector(state => state.token.token.accessToken);

  const handleInputValue = e => {
    const { name, value } = e.target;
    setInputValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,64})/;
  const validatePassword = passwordRegex.test(inputValues.password);

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

  const setNewPassword = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/users/search`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          account: inputValues.account,
          answer: inputValues.answer,
          editPassword: inputValues.password,
        }),
      });

      if (res.status === 200) {
        alert('비밀번호가 변경되었습니다.');
        navigate('/');
      } else if (res.status === 400) {
        alert('ID 또는 가입시 입력한 초등학교명과 다릅니다.');
      } else if (res.status === 500) {
        alert('비밀번호 변경 실패: 개발자에게 문의하세요');
      }
    } catch (error) {
      console.error('통신에러:', error);
      alert('비밀번호 변경에 실패하였습니다.');
    }
  };

  useEffect(() => {
    const { account, answer, password, password2 } = inputValues;
    const areInputsFilled = account && answer && password && password2;
    const isPasswordMatch = inputValues.password === inputValues.password2;
    setPasswordError(!isPasswordMatch);
    setIsDisabled(!(areInputsFilled && isPasswordMatch && validatePassword));
  }, [inputValues, validatePassword]);

  return (
    <BodyBox>
      <FindPasswordBox>
        <FindName>비밀번호 재설정</FindName>
        <InputBox>
          <AccountInput
            placeholder="계정을 입력해주세요"
            name="account"
            onChange={handleInputValue}
            required
          />
          <AnswerInput
            placeholder="졸업한 초등학교의 이름은?"
            name="answer"
            onChange={handleInputValue}
            required
          />
          <PasswordInput
            onBlur={handleBlur}
            name="password"
            placeholder="신규 비밀번호를 입력해주세요"
            onChange={handleInputValue}
            hasError={passwordError}
            required
          />
          <PasswordInput
            name="password2"
            placeholder="동일한 비밀번호를 입력해주세요"
            onChange={handleInputValue}
            hasError={passwordError}
            required
          />
        </InputBox>
        <FindPasswordBtn onClick={setNewPassword} disabled={isDisabled}>
          변경하기
        </FindPasswordBtn>
        <Link to="/">
          <GotoMain>메인페이지로</GotoMain>
        </Link>
      </FindPasswordBox>
      {/* <FindAccountBox>
        <FindName>계정 찾기</FindName>
      </FindAccountBox> */}
    </BodyBox>
  );
};

export default FindPassword;

const BodyBox = styled.div`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  width: 768px;
  height: 100vh;
  color: ${props => props.theme.subColor};
  background-color: #f8f4eb;
`;

const FindName = styled.h1`
  padding: 0.5em 0;
  font-size: 1.6em;
  color: ${props => props.theme.mainColor};
`;

const FindPasswordBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1em;
  border: 1px solid ${props => props.theme.mainColor};
  background-color: ${props => props.theme.subColor};
  border-radius: 0.5em;
  padding: 1em;
  width: 23em;
  height: 24em;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 13em;
`;

const AccountInput = styled.input``;

const AnswerInput = styled.input``;

const PasswordInput = styled.input`
  border-color: ${props => (props.hasError ? 'red' : '#d5d5d5')};
`;

const FindPasswordBtn = styled.button`
  width: 80%;
  height: 2.5em;
  border-radius: 0.5em;
  color: white;
  background-color: ${props => (props.disabled ? '#d0d0d0' : '#a6926b')};
`;

const GotoMain = styled.button`
  font-size: 15px;
  font-weight: 500;
  height: 100%;
  margin-top: 0.5em;
  color: ${props => props.theme.mainColor};
`;

// const FindAccountBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   padding: 2em 0 1em 0;
//   border: 1px solid ${props => props.theme.mainColor};
//   background-color: ${props => props.theme.subColor};
//   border-radius: 0.5em;
//   padding: 1.5em;
//   width: 25em;
//   height: 20em;
//   flex-direction: column;
//   margin: 0 auto;
//   align-items: center;
// `;
