import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from '../store/store';
import GoogleLoginButton from '../components/GoogleLoginButton';
import Tutorial from './Tutorial';
import styles from '../styles/page/Login.module.css';

const LoginRender = ({ onLogin }) => {
  return (
    <>
      <div className={styles.title}>
        <p className={styles.sub__top}>당신을 위한 단 하나의 일정 관리</p>
        <h1 className={styles.logo}>WantoDo</h1>
        <p className={styles.sub__bottom}>지금 이 순간, 당신이 원하던 삶이 펼쳐집니다.</p>
      </div>
      <div className={styles.login}>
        <GoogleLoginButton onLogin={onLogin} />
      </div>
    </>
  );
};

const Login = ({ createProfile }) => {
  const [tutorialDisplay, setTutorialDisplay] = useState(false);
  const [defaultProfile, setDefaultProfile] = useState({});
  const history = useHistory();

  // 로그인 하면 사용자 등록 여부에 따라 렌더링할 페이지 변경
  const onLogin = (profile, isTutorial) => {
    // 튜토리얼(프로필 등록) 했는지 여부 확인
    if (isTutorial) {
      createProfile(profile);
      history.push('/');
    } else {
      setDefaultProfile(profile);
      setTutorialDisplay(true);
    }
  };

  return (
    <section className={styles.container}>
      {tutorialDisplay ? <Tutorial profile={defaultProfile} /> : <LoginRender onLogin={onLogin} />}
    </section>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createProfile: (profile) => {
      dispatch(actionCreators.createProfile(profile));
    },
  };
};

export default connect(undefined, mapDispatchToProps)(Login);
