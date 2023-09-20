import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const Signup = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

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

    if (inputValues.password !== inputValues.password2) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [inputValues]);

  const addUser = () => {
    fetch(`${process.env.REACT_APP_API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        account: inputValues.account,
        password: inputValues.password,
      }),
    }).then(res => {
      if (res.status === 200) {
        navigate('/');
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
          {showAlert && <AlertWrongPw>비밀번호가 다릅니다.</AlertWrongPw>}
          <SignupBtn
            name="signupBtn"
            onClick={() => {
              addUser();
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
  width: 768px;
  height: 100vh;
  align-items: center;
  background-color: #f7f0e0c9;
  margin: 0 auto;
  border-top: 1px solid #efeae0;
`;

const SignupBox = styled.div`
  border: 1px solid ${props => props.theme.mainColor};
  background-color: ${props => props.theme.subColor};
  border-radius: 0.5em;
  padding: 1.5em;
  width: 25em;
  height: 27em;
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

const SignupForm = styled.div`
  display: grid;
  justify-items: center;
  grid-gap: 0.6em;
`;

const AccountInput = styled.input``;

const PasswordInput = styled.input``;

const AlertWrongPw = styled.p`
  color: #fa4d4d;
  font-size: 0.9em;
  margin-top: 7px;
`;

const SignupBtn = styled.button`
  margin: 10px 0;
  width: 16em;
  height: 2.8em;
  border-radius: 0.5em;
  color: white;
  background-color: ${props => (props.disabled ? '#d0d0d0' : '#a6926b')};
`;

const ToMain = styled.p`
  font-size: 0.9em;
  color: ${props => props.theme.mainColor};
`;
