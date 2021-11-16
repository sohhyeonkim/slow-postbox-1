import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import './NavigationBar.css';

export default function NavigationBar({ isChecked }) {
  const { isLogin, isAdmin } = useSelector((state) => state.loginReducer);

  return (
    <>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
        <link
          href='https://fonts.googleapis.com/css2?family=Gaegu:wght@300&display=swap'
          rel='stylesheet'
        />
      </head>
      <div className='navBar-container'>
        <div className='bar'>
          <div
            className='home'
            onClick={() => {
              window.location.replace('/');
            }}
          >
            느린 우체통
          </div>
          <Link
            to='/mailbox'
            style={{ color: 'inherit', textDecoration: 'inherit' }}
            className={
              isLogin ? 'mailBox' : 'mailBox hidden'
            }
          >
            <div className={
                isChecked
                  ? 'mailBox noti-on'
                  : ''
            }>받은 편지함</div> ""
          </Link>
          <Link
            to='/sent-mailbox'
            style={{ color: 'inherit', textDecoration: 'inherit' }}
            className={isLogin ? 'sent' : 'sent hidden'}
          >
            <div>보낸 편지함</div>
          </Link>
          <Link
            to='/mailform'
            style={{ color: 'inherit', textDecoration: 'inherit' }}
            className={isLogin ? 'write' : 'write hidden'}
          >
            <div>편지 쓰기</div>
          </Link>
          {isLogin ? (
            <>
              <Link
                to='/mypage'
                style={{ color: 'inherit', textDecoration: 'inherit' }}
                className='mypage'
              >
                <div>마이페이지</div>
              </Link>
              <Link
                to='/login'
                style={{ color: 'inherit', textDecoration: 'inherit' }}
                className='login'
              >
                <div>
                  <span>로그아웃</span>
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link
                to='/login'
                style={{ color: 'inherit', textDecoration: 'inherit' }}
                className='login'
              >
                <div>
                  <span>로그인</span>
                </div>
              </Link>
              <Link
                to='/signup'
                style={{ color: 'inherit', textDecoration: 'inherit' }}
                className='signup'
              >
                <div>회원가입</div>
              </Link>
            </>
          )}
          {isLogin && isAdmin ? (
            <div className='admin'>
              <Link
                to='/admin'
                style={{ color: 'inherit', textDecoration: 'inherit' }}
              >
                <FontAwesomeIcon icon={faCog} />
              </Link>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
}
