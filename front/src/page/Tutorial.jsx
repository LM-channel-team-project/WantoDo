import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { actionCreators } from '../store/store';

import Button from '../components/Button';
import IconButton from '../components/IconButton';
import InputBox from '../components/InputBox';
import ProfileImage from '../components/ProfileImage';

import accountManager from '../utils/account-manager';
import useInput from '../hooks/useInput';
import styles from '../styles/page/Login.module.css';
import ImageModal from '../container/ImageModal';

const Tutorial = ({ profile: defaultProfile, token, createProfile }) => {
  const [modal, setModal] = useState(false);
  const history = useHistory();

  const userNameInput = useInput(defaultProfile.userName);
  const mottoInput = useInput();
  const [imageURL, setImageURL] = useState(defaultProfile.imageURL);

  const onImageButtonClick = () => {
    setModal(true);
  };

  const onSelectImage = (e) => {
    const target = e.target.tagName === 'BUTTON' ? e.target.firstChild : e.target;
    const { origin } = target.dataset;

    setImageURL(origin);
    setModal(false);
  };

  const onRegisterClick = (event) => {
    event.preventDefault();

    const profile = {
      ...defaultProfile,
      userName: userNameInput.value,
      motto: mottoInput.value,
      imageURL,
    };

    createProfile(profile);
    accountManager.updateUserProfile(token, profile); // 프로필 수정 정보 전송
    accountManager.completeTutorial(token); // 튜토리얼 완료 상태 전송
    history.push('/');
  };

  return (
    <>
      <form className={styles.form} onSubmit={onRegisterClick}>
        <ul className={styles.list}>
          <li className={styles.profile}>
            <ProfileImage imageURL={imageURL} styleName="tutorial" />
            <IconButton Icon={FaPlus} styleName="tutorial__image" onClick={onImageButtonClick} />
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
      {modal && (
        <ImageModal
          imageList={[0, 1, 2, defaultProfile.imageURL]}
          onSelect={onSelectImage}
          closeModal={() => setModal(false)}
        />
      )}
    </>
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
