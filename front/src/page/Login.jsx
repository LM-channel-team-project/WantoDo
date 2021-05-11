import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useGoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { AiOutlineGoogle } from 'react-icons/ai';
import { actionCreators } from '../store/store';
import Tutorial from './Tutorial';
import IconButton from '../components/IconButton';
import accountManager from '../utils/account-manager';
import styles from '../styles/page/Login.module.css';

const LoginRender = ({ onLogin }) => {
  const onSuccess = async (response) => {
    // 서버에 사용자 정보 전송, 가입 상태 및 프로필 정보 응답 받음
    const idToken = response.tokenObj.id_token;

    const { name, email } = response.profileObj;

    const userData = await accountManager.getUserData(idToken);

    const defaultProfile = {
      userName: name.length > 10 ? name.slice(0, 10) : name,
      email,
    };

    // 서버에 등록된 프로필 없으면 구글 프로필 전달 (가입 안 된 사용자인 경우)
    const profile = userData.isTutorial ? userData.profile : defaultProfile;

    onLogin(profile, userData.isTutorial);
    // 서버에 튜토리얼 완료 메시지 전송
    accountManager.completeTutorial(idToken);
  };

  const { signIn } = useGoogleLogin({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    onSuccess,
    // 로그인 실패 시 다시 로그인 시도
    onFailure: () => signIn(),
    // true로 설정 시 이미 로그인한 상태이면 onSuccess 호출, 로그아웃 상태면 호출 안함
    isSignedIn: true,
  });

  return (
    <>
      <div className={styles.title}>
        <p className={styles.sub__top}>당신을 위한 단 하나의 일정 관리</p>
        <h1 className={styles.logo}>WantoDo</h1>
        <p className={styles.sub__bottom}>지금 이 순간, 당신이 원하던 삶이 펼쳐집니다.</p>
      </div>
      <div className={styles.login}>
        <IconButton Icon={AiOutlineGoogle} styleName="loginbutton" onClick={signIn}>
          구글 계정으로 시작하기
        </IconButton>
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
    // 튜토리얼 완료 여부 확인
    if (isTutorial) {
      createProfile(profile); // 프로필 전역 상태에 등록
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
