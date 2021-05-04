import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { connect } from 'react-redux';
import { actionCreators } from '../store/store';
import GoogleLoginButton from '../components/GoogleLoginButton';
import ProfileImage from '../components/ProfileImage';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import IconButton from '../components/IconButton';
import styles from '../styles/page/Login.module.css';

const mapDispatchToProps = (dispatch) => {
  return {
    createProfile: (profile) => {
      dispatch(actionCreators.createProfile(profile));
    },
  };
};

const LoginPage = ({ onLogin }) => {
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

const TutorialPage = connect(
  undefined,
  mapDispatchToProps,
)(({ profile }) => {
  return (
    <form className={styles.form}>
      <ul className={styles.list}>
        <li className={styles.profile}>
          <ProfileImage imageURL={profile.imageURL} styleName="tutorial" />
          <IconButton Icon={FaPlus} styleName="tutorial__image" />
        </li>
        <li className={styles.textBox}>
          <InputBox
            value={profile.userName}
            labelText="이름"
            inputName="name"
            styleName="tutorial"
            maxLength="10"
          />
          <InputBox
            inputType="textarea"
            labelText="좌우명"
            inputName="motto"
            rows="3"
            cols="15"
            maxLength="30"
            styleName="tutorial"
          />
        </li>
      </ul>
      <div className={styles.buttons}>
        <Button styleName="tutorial__cancel">취소</Button>
        <Button type="submit" styleName="tutorial">
          가입
        </Button>
      </div>
    </form>
  );
});

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
      {tutorialDisplay ? (
        <TutorialPage profile={defaultProfile} />
      ) : (
        <LoginPage onLogin={onLogin} />
      )}
    </section>
  );
};

export default connect(undefined, mapDispatchToProps)(Login);
