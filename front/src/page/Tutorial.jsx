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

const Tutorial = ({ profile: defaultProfile, token, createProfile }) => {
  const history = useHistory();

  const [imageURL, setImageURL] = useState(defaultProfile.imageURL);

  const onImageChange = (url = '') => {
    setImageURL(url);
  };

  const onRegisterClick = (event) => {
    event.preventDefault();

    const form = new FormData(event.target);
    // 폼 내에 모든 input 값을 받아와 객체로 변환
    const tutorial = Array.from(form.keys()).reduce((obj, key) => {
      const copied = { ...obj };

      copied[key] = form.get(key);
      return copied;
    }, {});

    const profile = Object.assign(defaultProfile, tutorial);

    createProfile(profile);
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
            value={defaultProfile.userName}
            labelText="이름"
            name="userName"
            styleName="tutorial"
            maxLength="10"
          />
          <InputBox
            inputType="textarea"
            labelText="좌우명"
            name="motto"
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
