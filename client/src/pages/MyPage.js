import styled from 'styled-components';
import './MyPage.css';
import emptyImg from '../img/empty.png';
import receivedmail from '../img/receivedmail.svg';
import { useState, useEffect } from 'react';
import Withdrawal from '../components/MyPage/Withdrawal';
const { availablePw, matchingPw } = require('../funcs/userFuncs');
function MyPage() {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const [innerToggleState, setInnerToggleState] = useState(1);
  const innerToggleTab = (index) => {
    setInnerToggleState(index);
  };
  const [passwords, setPasswords] = useState({
    newPassword: '',
    matchingPassword: '',
  });
  const [confirmedPassword, setConfrimedPassword] = useState('');
  const [isAvailable, setIsAvailable] = useState('');
  const [isMatching, setIsMatching] = useState('');

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    let timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (availablePw(passwords.newPassword)) {
        setIsAvailable('사용가능한 비밀번호입니다');
        setConfrimedPassword(passwords.newPassword);
      } else if (
        !availablePw(passwords.newPassword) &&
        passwords.newPassword !== ''
      ) {
        setIsAvailable('비밀번호는 10자리 이상 15자리 이하여야합니다');
      }
    }, 500);
  }, [passwords.newPassword]);

  useEffect(() => {
    let timer;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (
        matchingPw(confirmedPassword, passwords.matchingPassword) &&
        passwords.matchingPassword !== ''
      ) {
        setIsMatching('비밀번호가 일치합니다');
      } else if (
        !matchingPw(confirmedPassword, passwords.matchingPassword) &&
        passwords.matchingPassword !== ''
      ) {
        setIsMatching('비밀번호가 일치하지 않습니다');
      }
    }, 500);
  }, [confirmedPassword, passwords.matchingPassword]);

  return (
    <>
      <div className='mypage-container'>
        <div className='tab-wrapper'>
          <StyledTabs>
            <span
              className={
                toggleState === 1 ? 'tab-text active-tabs' : 'tab-text'
              }
              onClick={() => toggleTab(1)}
            >
              활동로그
            </span>
            <span className='tab-divider'>|</span>
            <span
              className={
                toggleState === 2 || toggleState === 3
                  ? 'tab-text active-tabs'
                  : 'tab-text'
              }
              onClick={() => toggleTab(2)}
            >
              개인정보 수정
            </span>
          </StyledTabs>
          <div className='styledTabContent-wrapper'>
            <div
              className={
                toggleState === 1 ? 'active-content' : 'inactive-content'
              }
            >
              <StyledTabContent>
                <StyledTabs innerTab>
                  <span
                    className={
                      innerToggleState === 1
                        ? 'tab-text active-tabs'
                        : 'tab-text'
                    }
                    onClick={() => innerToggleTab(1)}
                  >
                    받은 편지
                  </span>
                  <span
                    className={
                      innerToggleState === 2
                        ? 'tab-text active-tabs'
                        : 'tab-text'
                    }
                    onClick={() => innerToggleTab(2)}
                  >
                    보낸 편지
                  </span>
                </StyledTabs>
                <StyledLogs>
                  <div
                    className={
                      innerToggleState === 1
                        ? 'active-content'
                        : 'inactive-content'
                    }
                  >
                    <ul className='ul-mailbox'>
                      <li className='li-mail'>
                        <img
                          src={receivedmail}
                          className='li-icon flex-item'
                          alt='받은메일'
                        />
                        <span className='li-title'>제목부분입니다</span>
                        <span className='li-date'>날짜</span>
                      </li>
                      <li className='li-mail'>
                        <img
                          src={receivedmail}
                          className='li-icon flex-item'
                          alt='받은메일'
                        />
                        <span className='li-title'>제목부분입니다</span>
                        <span className='li-date'>날짜</span>
                      </li>
                      <li className='li-mail'>
                        <img
                          src={receivedmail}
                          className='li-icon flex-item'
                          alt='받은메일'
                        />
                        <span className='li-title'>제목부분입니다</span>
                        <span className='li-date'>날짜</span>
                      </li>
                    </ul>
                  </div>
                  <div
                    className={
                      innerToggleState === 2
                        ? 'active-content'
                        : 'inactive-content'
                    }
                  >
                    <img src={emptyImg} alt='empty' className='emptyImg' />
                    <p className='no-logs'>내역이 없습니다</p>
                  </div>
                </StyledLogs>
              </StyledTabContent>
            </div>
            <div
              className={
                toggleState === 2 ? 'active-content' : 'inactive-content'
              }
            >
              <form className='form-renewPw'>
                <p className='p-renew-pw'>새로운 비밀번호</p>
                <input
                  type='password'
                  className='input-renew-pw'
                  name='newPassword'
                  value={passwords.newPassword}
                  onChange={handleChange}
                  required
                />
                <span
                  className={
                    isAvailable === '사용가능한 비밀번호입니다'
                      ? 'span-alert available'
                      : 'span-alert unavailable'
                  }
                >
                  {isAvailable}
                </span>
                <p className='p-renew-pw'>비밀번호 확인</p>
                <input
                  type='password'
                  className='input-renew-pw'
                  name='matchingPassword'
                  value={passwords.matchingPassword}
                  onChange={handleChange}
                  required
                />
                <span
                  className={
                    isMatching === '비밀번호가 일치합니다'
                      ? 'span-alert available'
                      : 'span-alert unavailable'
                  }
                >
                  {isMatching}
                </span>
                <button type='button' className='btn-submit'>
                  변경하기
                </button>
                <button
                  type='button'
                  className='btn-withdrawal'
                  onClick={() => toggleTab(3)}
                >
                  탈퇴하기
                </button>
              </form>
            </div>
            <div
              className={
                toggleState === 3 ? 'active-content' : 'inactive-content'
              }
            >
              <Withdrawal />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const StyledTabContent = styled.div`
  align-items: flex-start;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  /* border: 4px solid palevioletred; */
`;

const StyledTabs = styled.div`
  flex: 1 1 auto;
  font-size: ${(props) => (props.innerTab ? '1em' : '1.2em')};
  padding: ${(props) => (props.innerTab ? '1.2em' : '0.55em 1em')};
  color: #a6a6a6;
`;

const StyledLogs = styled.div`
  width: 100%;
  /* border: 3px solid green; */
  display: block;
`;

export default MyPage;
