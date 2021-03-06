import React, { useState } from 'react';
import { connect } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import { GoCheck } from 'react-icons/go';
import { FaPencilAlt, FaPlus } from 'react-icons/fa';
import { actionCreators } from 'store/store';
import Modal from 'components/Layout/Modal';
import ProfileImage from 'components/Global/ProfileImage';
import Button from 'components/Global/Button';
import Input from 'components/Global/Input';
import InputBox from 'components/Global/InputBox';
import IconButton from 'components/Global/IconButton';
import ImageModal from 'components/Global/ImageModal';
import accountManager from 'utils/account-manager';
import useInput from 'hooks/useInput';
import styles from './styles.module.css';

/**
 * 사용자의 프로필 정보를 표시하는 컴포넌트
 * @param {string} props.imageURL - 사용자 프로필 이미지 URL 문자열
 * @param {string} props.userName - 사용자 이름 문자열
 * @param {string} props.email - 사용자 email 문자열
 * @param {string} props.motto - 사용자의 좌우명 문자열
 * @param {Function} props.setEditDisplay - 프로필 모달에 표시할 컴포넌트를 변경하는 함수
 */
const Profile = ({
  signOut,
  token,
  imageURL,
  userName,
  email,
  motto,
  setEditDisplay,
  closeModal,
  editProfile,
}) => {
  const nameInput = useInput(userName);
  const mottoInput = useInput(motto);
  const [subModal, setSubModal] = useState(false);

  // 프로필 수정 폼으로 모달 변경
  const onEditClick = () => {
    setEditDisplay(true);
  };

  // 프로필 이름
  const [editProfileName, setEditProfileName] = useState(true);

  const editIcon = () => {
    setEditProfileName(!editProfileName);
  };

  // Motto
  const [editMotto, setEditMotto] = useState(true);

  const editMottoIcon = () => {
    setEditMotto(!editMotto);
  };

  // 로그아웃 처리
  const onLogout = () => {
    signOut();
  };

  // 프로필 사진
  const onImageSelect = (url) => {
    const updated = { imageURL: url };

    accountManager.updateUserProfile(token, updated);
    editProfile(updated);
    setSubModal(false);
  };

  // 모달 닫기 버튼
  const closeProfileModal = () => {
    closeModal();
  };

  // 프로필 이름 변경
  const profileNameEditClick = () => {
    const value = { userName: nameInput.value };
    const changed = {};

    if (value.userName !== userName) changed.userName = value.userName;
    editProfile(changed);
    accountManager.updateUserProfile(token, changed);
  };

  // 모토 변경
  const mottoEditClick = () => {
    const value = { motto: mottoInput.value };
    const changed = {};

    if (value.motto !== motto) changed.motto = value.motto;
    editProfile(changed);
    accountManager.updateUserProfile(token, changed);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.profile}>
          <div className={styles.profileBox}>
            <ProfileImage imageURL={imageURL} styleName="profileModal" />
            <IconButton Icon={FaPlus} styleName="image_add" onClick={() => setSubModal(true)} />
          </div>
        </div>
        {/* X닫기 버튼 */}
        <IconButton styleName="closeProfile" onClick={closeProfileModal}>
          <AiOutlineClose />
        </IconButton>

        {/* 사용자 이름 */}
        <div className={styles.profileNameContainer}>
          {editProfileName && (
            <h3 type="text" className={styles.name}>
              {userName || 'anonymous'}
            </h3>
          )}
          {!editProfileName && (
            <Input
              type="textarea"
              onChange={nameInput.onChange}
              value={nameInput.value}
              styleName="profileModalName"
            />
          )}
          <IconButton
            type="button"
            styleName="profileModalEditButton"
            onClick={() => {
              editIcon();
              if (!editProfileName) {
                profileNameEditClick();
              }
            }}
          >
            {editProfileName && <FaPencilAlt className={styles.editIcon} />}
            {!editProfileName && <GoCheck className={styles.closeIcon} />}
          </IconButton>
        </div>
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
              onChange={mottoInput.onChange}
              value={mottoInput.value}
              styleName="mottoText"
            />
          )}
        </li>
        <li>
          <IconButton
            type="button"
            styleName="profileModalEditButton"
            onClick={() => {
              editMottoIcon();
              if (!editMotto) {
                mottoEditClick();
              }
            }}
          >
            {editMotto && <FaPencilAlt className={styles.editIcon} />}
            {!editMotto && <GoCheck className={styles.closeIcon} />}
          </IconButton>
        </li>
      </ul>

      <footer className={styles.footer}>
        <Button styleName="profileModal" onClick={onEditClick}>
          프로필 수정
        </Button>
        <Button styleName="profileModal" onClick={onLogout}>
          로그아웃
        </Button>
      </footer>
      {subModal && (
        <ImageModal
          imageList={[0, 1, 2]}
          styleName="small"
          onSelect={onImageSelect}
          closeModal={() => setSubModal(false)}
        />
      )}
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
          <div className={styles.profileBox}>
            <ProfileImage imageURL={imageURL} styleName="profileModal" />
          </div>
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
const ProfileModal = ({ closeModal, ...props }) => {
  const [editDisplay, setEditDisplay] = useState(false);
  return (
    <Modal styleName="profileModal" isBG onBGClick={closeModal}>
      {editDisplay ? (
        <ProfileEdit {...props} setEditDisplay={setEditDisplay} />
      ) : (
        <Profile {...props} closeModal={closeModal} setEditDisplay={setEditDisplay} />
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
