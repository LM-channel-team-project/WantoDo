import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { IoIosClose } from 'react-icons/io';
import { FaPencilAlt } from 'react-icons/fa';
import { actionCreators } from '../store/store';
import Modal from '../container/Modal';
import ProfileImage from './ProfileImage';
import Button from './Button';
import styles from '../styles/ProfileModal.module.css';
import GoogleLogoutButton from './GoogleLogoutButton';
import Input from './Input';
import InputBox from './InputBox';
import accountManager from '../utils/account-manager';
import IconButton from './IconButton';

/**
 * 사용자의 프로필 정보를 표시하는 컴포넌트
 * @param {string} props.imageURL - 사용자 프로필 이미지 URL 문자열
 * @param {string} props.userName - 사용자 이름 문자열
 * @param {string} props.email - 사용자 email 문자열
 * @param {string} props.motto - 사용자의 좌우명 문자열
 * @param {Function} props.setEditDisplay - 프로필 모달에 표시할 컴포넌트를 변경하는 함수
 */
const Profile = ({
  imageURL,
  userName,
  email,
  motto,
  token,
  setEditDisplay,
  toogleProfileModal,
  editProfile,
}) => {
  const history = useHistory();
  const nameRef = useRef();
  const mottoRef = useRef();

  const onEditClick = () => {
    // 프로필 수정 폼으로 모달 변경
    setEditDisplay(true);
  };

  // 프로필 이름
  const [editProfileName, setEditProfileName] = useState(true);

  const editIcon = () => {
    setEditProfileName(!editProfileName);
  };

  // motto
  const [editMotto, setEditMotto] = useState(true);

  const editMottoIcon = () => {
    setEditMotto(!editMotto);
  };

  const onLogout = () => {
    // 로그아웃 처리
    history.push('/login');
  };

  const closeProfileModal = () => {
    toogleProfileModal();
  };

  const profileEditClick = () => {
    const value = { userName: nameRef.current.value };
    const changed = {};

    if (value.userName !== userName) changed.userName = value.userName;

    editProfile(changed);
    accountManager.updateUserProfile(token, changed);
  };

  const mottoEditClick = () => {
    const value = { motto: mottoRef.current.value };
    const changed = {};

    if (value.motto !== motto) changed.motto = value.motto;
    editProfile(changed);
    accountManager.updateUserProfile(token, changed);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.profile}>
          <ProfileImage imageURL={imageURL} styleName="profileModal" />
        </div>
        {/* X닫기 버튼 */}
        <IconButton styleName="closeProfile" onClick={closeProfileModal}>
          <AiOutlineClose />
        </IconButton>

        {/* 사용자 이름 */}
        {editProfileName && (
          <h3 type="text" className={styles.name}>
            {userName || 'anonymous'}
          </h3>
        )}
        {!editProfileName && (
          <Input
            type="textarea"
            inputRef={nameRef}
            value={userName || 'anonymous'}
            styleName="profileModalName"
          />
        )}
        <IconButton
          type="button"
          onClick={() => {
            editIcon();
            if (!editProfileName) {
              profileEditClick();
            }
          }}
        >
          {editProfileName && <FaPencilAlt className={styles.editIcon} />}
          {!editProfileName && <IoIosClose className={styles.closeIcon} />}
        </IconButton>

        {/* 이메일 */}
        <p className={styles.email}>{email || '이메일 정보를 찾을 수 없습니다.'}</p>
      </header>
      <ul className={styles.intros}>
        <li className={styles.intro}>
          <span className={styles.mottoTitle}>MOTTO</span>
          {editMotto && (
            <span type="text" className={styles.text}>
              {motto || '좌우명을 등록해보세요.'}
            </span>
          )}
          {!editMotto && (
            <Input
              type="textarea"
              inputRef={mottoRef}
              value={motto || '좌우명을 등록해보세요.'}
              styleName="mottoText"
            />
          )}
        </li>
        <IconButton
          type="button"
          onClick={() => {
            editMottoIcon();
            if (!editMotto) {
              mottoEditClick();
            }
          }}
        >
          {editMotto && <FaPencilAlt className={styles.editIcon} />}
          {!editMotto && <IoIosClose className={styles.closeIcon} />}
        </IconButton>
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
  const nameRef = useRef();
  const mottoRef = useRef();

  const onCancleClick = () => {
    // 프로필 모달로 변경
    setEditDisplay(false);
  };

  const onEditClick = () => {
    // 변경된 데이터만 객체로 만듦
    const values = { userName: nameRef.current.value, motto: mottoRef.current.value };
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
          inputRef={nameRef}
          value={userName}
          name="userName"
          styleName="profileModal__name"
          maxLength="10"
        />
        <p className={styles.email}>{email || '이메일 정보를 찾을 수 없습니다.'}</p>
      </header>
      <ul className={styles.intros}>
        <li className={styles.intro}>
          <InputBox
            inputRef={mottoRef}
            value={motto}
            type="textarea"
            labelText="MOTTO"
            name="motto"
            rows="3"
            cols="15"
            styleName="profileModify__motto"
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
    toogleProfileModal: () => dispatch(actionCreators.toggleModal('profile')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileModal);
