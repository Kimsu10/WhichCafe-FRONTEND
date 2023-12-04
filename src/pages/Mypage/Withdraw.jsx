import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { getCookieToken, removeCookieToken } from '../../Storage/Cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DELETE_TOKEN } from '../../Store/AuthStore';

const Withdraw = ({ setIsWarning }) => {
  const [inputValue, setInputValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalRef = useRef();

  const token = useSelector(state => state.token.token.accessToken);

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    setIsDisabled(!(inputValue === '동의합니다'));
  }, [inputValue]);

  const handleKeyUp = e => {
    if (e.key === 'Enter' && !isDisabled) {
      handleWithdrawUser(e);
    }
  };

  const handleClickOutSide = e => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsWarning(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, []);

  const handleWithdrawUser = async e => {
    e.preventDefault();
    const confirmation = window.confirm('정말로 탈퇴하시겠습니까?');
    if (!confirmation) return;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/mypage`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            deleteMessage: inputValue,
          }),
        },
      );

      if (response.status === 204) {
        dispatch(DELETE_TOKEN());
        removeCookieToken();
        alert('이용해주셔서 감사합니다.');
        navigate('/');
        window.location.reload();
      } else if (response.status === 400) {
        alert('입력하신 문자가 다릅니다.');
      } else if (response.status === 401) {
        alert('다시 로그인 해주세요');
      } else {
        alert('탈퇴에 실패했습니다.');
      }
    } catch (error) {
      console.error('통신 에러:', error);
      alert('통신 에러가 발생했습니다.');
    }
  };
  return (
    <WarningBox ref={modalRef}>
      <Question>
        정말로 탈퇴하시겠습니까?
        <br />
        아래의 문구를 입력하시고 확인을 누르시면 탈퇴가 완료됩니다.
      </Question>
      <AgreeInput
        type="text"
        placeholder="'동의합니다' 를 입력해주세요"
        value={inputValue}
        onChange={handleInputChange}
        onKeyUp={handleKeyUp}
      />
      <SubmitBtn
        type="submit"
        disabled={isDisabled}
        onClick={handleWithdrawUser}
      >
        탈퇴하기
      </SubmitBtn>
      <CloseModal onClick={() => setIsWarning(false)}>돌아가기</CloseModal>
    </WarningBox>
  );
};

export default Withdraw;

const WarningBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.subColor};
  width: 30em;
  height: 30em;
  border: 1px solid #a6926b;
  position: absolute;
  top: -1%;
  left: -5%;
  border-radius: 0.5em;
  gap: 15px;
`;

const Question = styled.p``;

const AgreeInput = styled.input``;

const SubmitBtn = styled.button`
  width: 22em;
  background-color: ${props => (props.disabled ? '#d0d0d0' : '#a6926b')};
`;

const CloseModal = styled.button`
  font-size: 20px;
  font-weight: 700;
  padding-top: 2em;
  color: ${props => props.theme.mainColor};
`;
