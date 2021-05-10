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

const Tutorial = ({ profile, createProfile }) => {
  const history = useHistory();

  const [imageURL, setImageURL] = useState(profile.imageURL);

  const onImageChange = (url = '') => {
    setImageURL(url);
  };

  const onRegisterClick = (event) => {
    event.preventDefault();

    const form = new FormData(event.target);

    const newProfile = Array.from(form.keys()).reduce((obj, key) => {
      const copied = { ...obj };

      copied[key] = form.get(key);
      return copied;
    }, {});

    // 임시 처리
    newProfile.email = profile.email;

    createProfile(newProfile);
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
            value={profile.userName}
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

const mapDispatchToProps = (dispatch) => {
  return {
    createProfile: (profile) => {
      dispatch(actionCreators.createProfile(profile));
    },
  };
};

export default connect(undefined, mapDispatchToProps)(Tutorial);
