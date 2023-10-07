import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FindPassword = () => {
  const navigate = useNavigate();

  const [inputValues, setInputValues] = useState({
    account: '',
    answer: '',
    password: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);

  const handleInputValue = e => {
    const { name, value } = e.target;
    setInputValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const setNewPassword = () => {
    fetch(`${process.env.REACT_APP_API_URL}/users/search`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        account: inputValues.account,
        answer: inputValues.answer,
        editPassword: inputValues.password,
      }),
    }).then(async res => {
      if (res.status === 200) {
        alert('비밀번호가 변경되었습니다');
        return navigate('/');
      } else {
        if (res.message === 'wrong answer') {
          alert('가입시 입력한 초등학교명과 다릅니다.');
        }
      }
    });
  };

  useEffect(() => {
    const { account, answer, password } = inputValues;
    const areInputsFilled = account && answer && password;
    setIsDisabled(!areInputsFilled);
  }, [inputValues]);

  return (
    <BodyBox>
      <FindPasswordBox>
        <FindName>비밀번호 재설정</FindName>
        <InputBox>
          <AccountInput
            placeholder="계정을 입력해주세요"
            name="account"
            onChange={handleInputValue}
          />
          <AnswerInput
            placeholder="졸업한 초등학교의 이름은?"
            name="answer"
            onChange={handleInputValue}
          />
          <PasswordInput
            name="password"
            placeholder="신규 비밀번호를 입력해주세요"
            onChange={handleInputValue}
          />
        </InputBox>
        <FindPasswordBtn onClick={setNewPassword} disabled={isDisabled}>
          저장
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
  padding-top: 0.5em;
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
  height: 21em;
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
  height: 10em;
`;

const AccountInput = styled.input``;

const AnswerInput = styled.input``;

const PasswordInput = styled.input``;

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
