import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actionCreators } from '../store/store';
import Modal from '../container/Modal';
import ProfileImage from './ProfileImage';
import Button from './Button';
import styles from '../styles/ProfileModal.module.css';
import GoogleLogoutButton from './GoogleLogoutButton';
import Input from './Input';
import InputBox from './InputBox';
import accountManager from '../utils/account-manager';
import useInput from '../hooks/useInput';

/**
 * 사용자의 프로필 정보를 표시하는 컴포넌트
 * @param {string} props.imageURL - 사용자 프로필 이미지 URL 문자열
 * @param {string} props.userName - 사용자 이름 문자열
 * @param {string} props.email - 사용자 email 문자열
 * @param {string} props.motto - 사용자의 좌우명 문자열
 * @param {Function} props.setEditDisplay - 프로필 모달에 표시할 컴포넌트를 변경하는 함수
 */
const Profile = ({ imageURL, userName, email, motto, setEditDisplay }) => {
  const history = useHistory();

  const onEditClick = () => {
    // 프로필 수정 폼으로 모달 변경
    setEditDisplay(true);
  };

  const onLogout = () => {
    // 로그아웃 처리
    history.push('/login');
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.profile}>
          <ProfileImage imageURL={imageURL} styleName="profileModal" />
        </div>
        <h3 className={styles.name}>{userName || 'anonymous'}</h3>
        <p className={styles.email}>{email || '이메일 정보를 찾을 수 없습니다.'}</p>
      </header>
      <ul className={styles.intros}>
        <li className={styles.intro}>
          <span className={styles.mottoTitle}>MOTTO</span>
          <span className={styles.text}>{motto || '좌우명을 등록해보세요.'}</span>
        </li>
      </ul>
      <footer className={styles.footer}>
        <Button styleName="profileModal" onClick={onEditClick}>
          프로필 수정
        </Button>
        <GoogleLogoutButton onLogout={onLogout} />
      </footer>
    </>
  );
};

/**
 * 사용자의 프로필 정보를 표시하는 컴포넌트
 * @param {string} props.imageURL - 사용자 프로필 이미지 URL 문자열
 * @param {string} props.userName - 사용자 이름 문자열
 * @param {string} props.email - 사용자 email 문자열
 * @param {string} props.motto - 사용자의 좌우명 문자열
 * @param {Function} props.editProfile - 전역 프로필 수정하는 함수
 * @param {Function} props.setEditDisplay - 프로필 모달에 표시할 컴포넌트를 변경하는 함수
 */
const ProfileEdit = ({ imageURL, userName, email, motto, token, editProfile, setEditDisplay }) => {
  const nameInput = useInput(userName);
  const mottoInput = useInput(motto);

  const onCancleClick = () => {
    // 프로필 모달로 변경
    setEditDisplay(false);
  };

  const onEditClick = () => {
    // 변경된 데이터만 객체로 만듦
    const values = { userName: nameInput.value, motto: mottoInput.value };
    const changed = {};

    if (values.userName !== userName) changed.userName = values.userName;
    if (values.motto !== motto) changed.motto = values.motto;

    editProfile(changed);
    accountManager.updateUserProfile(token, changed); // 서버에 프로필 변경 요청
    setEditDisplay(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.profile}>
          <ProfileImage imageURL={imageURL} styleName="profileModal" />
        </div>
        <Input
          value={nameInput.value}
          styleName="profileModal__name"
          onChange={nameInput.onChange}
          maxLength="10"
        />
        <p className={styles.email}>{email || '이메일 정보를 찾을 수 없습니다.'}</p>
      </header>
      <ul className={styles.intros}>
        <li className={styles.intro}>
          <InputBox
            value={mottoInput.value}
            type="textarea"
            labelText="MOTTO"
            styleName="profileModify__motto"
            onChange={mottoInput.onChange}
            rows="3"
            cols="15"
            maxLength="30"
          />
        </li>
      </ul>
      <footer className={styles.footer}>
        <Button styleName="profileModal" onClick={onCancleClick}>
          취소
        </Button>
        <Button styleName="profileModal" onClick={onEditClick}>
          완료
        </Button>
      </footer>
    </>
  );
};

/**
 * 모달 프레임에 들어갈 프로필 모달
 * @param {Object} props - 사용자의 프로필 정보를 담고있는 객체
 */
const ProfileModal = (props) => {
  const [editDisplay, setEditDisplay] = useState(false);
  return (
    <Modal styleName="profileModal">
      {editDisplay ? (
        <ProfileEdit {...props} setEditDisplay={setEditDisplay} />
      ) : (
        <Profile {...props} setEditDisplay={setEditDisplay} />
      )}
    </Modal>
  );
};

const mapStateToProps = ({ profile: { imageURL, userName, email, motto }, token }) => {
  return { imageURL, userName, email, motto, token };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editProfile: (profile) => dispatch(actionCreators.editProfile(profile)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileModal);
