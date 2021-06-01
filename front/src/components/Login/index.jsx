import React, { useState } from 'react';
import { useGoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { AiOutlineGoogle } from 'react-icons/ai';
import { actionCreators } from 'store/store';
import Tutorial from 'components/Login/Tutorial';
import IconButton from 'components/Global/IconButton';
import accountManager from 'utils/account-manager';
import styles from './styles.module.css';

const LoginRender = ({ onLogin, pushToken }) => {
  const onLoginSuccess = async (response) => {
    // 서버에 사용자 정보 전송, 가입 상태 및 프로필 정보 응답 받음
    const idToken = response.tokenObj.id_token;
    const { profile, isTutorial } = await accountManager.getUserData(idToken);

    // 사용자 이름 10글자 내로 처리
    const { userName } = profile;
    profile.userName = userName.length > 10 ? userName.slice(0, 10) : userName;

    onLogin(profile, isTutorial);
    pushToken(idToken); // 서버에 튜토리얼 완료 메시지 전송
  };

  const { signIn } = useGoogleLogin({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    onSuccess: onLoginSuccess,
    isSignedIn: true,
    uxMode: 'redirect',
    redirectUri: process.env.PUBLIC_URL,
    // 추후 로그인 실패 시 알림 페이지 표시 기능 추가
    // onFailure: (e) => console.log(e),
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

const Login = ({ changeSignState, createProfile, pushToken }) => {
  const [tutorialDisplay, setTutorialDisplay] = useState(false);
  const [defaultProfile, setDefaultProfile] = useState({});

  // 로그인 하면 사용자 등록 여부에 따라 렌더링할 페이지 변경
  const onLogin = (profile, isTutorial) => {
    // 튜토리얼 완료 여부 확인
    if (isTutorial) {
      createProfile(profile); // 프로필 전역 상태에 등록
      changeSignState(true);
    } else {
      setDefaultProfile(profile);
      setTutorialDisplay(true);
    }
  };

  return (
    <section className={styles.container}>
      {tutorialDisplay ? (
        <Tutorial profile={defaultProfile} goToMain={() => changeSignState(true)} />
      ) : (
        <LoginRender pushToken={pushToken} onLogin={onLogin} />
      )}
    </section>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createProfile: (profile) => {
      dispatch(actionCreators.createProfile(profile));
    },
    pushToken: (token) => dispatch(actionCreators.pushToken(token)),
  };
};

export default connect(undefined, mapDispatchToProps)(Login);
