import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { actionCreators } from '../store/store';

import Button from '../components/Button';
import IconButton from '../components/IconButton';
import InputBox from '../components/InputBox';
import ProfileImage from '../components/ProfileImage';

import styles from '../styles/page/Login.module.css';
import accountManager from '../utils/account-manager';
import useInput from '../hooks/useInput';

const Tutorial = ({ profile: defaultProfile, token, createProfile }) => {
  const history = useHistory();

  const userNameInput = useInput(defaultProfile.userName);
  const mottoInput = useInput();
  const [imageURL, setImageURL] = useState(defaultProfile.imageURL);

  const onImageChange = (url = '') => {
    setImageURL(url);
  };

  const onRegisterClick = (event) => {
    event.preventDefault();

    const profile = { ...defaultProfile, userName: userNameInput.value, motto: mottoInput.value };

    createProfile(profile);
    accountManager.updateUserProfile(token, profile); // 프로필 수정 정보 전송
    accountManager.completeTutorial(token); // 튜토리얼 완료 상태 전송
    history.push('/');
  };

  return (
    <form className={styles.form} onSubmit={onRegisterClick}>
      <ul className={styles.list}>
        <li className={styles.profile}>
          <ProfileImage imageURL={imageURL} styleName="tutorial" />
          <IconButton Icon={FaPlus} styleName="tutorial__image" onClick={() => onImageChange()} />
        </li>
        <li className={styles.textBox}>
          <InputBox
            value={userNameInput.value}
            onChange={userNameInput.onChange}
            labelText="이름"
            styleName="tutorial"
            maxLength="10"
          />
          <InputBox
            value={mottoInput.value}
            onChange={mottoInput.onChange}
            labelText="좌우명"
            styleName="tutorial"
            inputType="textarea"
            rows="3"
            cols="15"
            maxLength="30"
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
};

const mapStateToProps = ({ token }) => {
  return { token };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createProfile: (profile) => {
      dispatch(actionCreators.createProfile(profile));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);
