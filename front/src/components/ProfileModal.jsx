import React from 'react';
import Modal from '../container/Modal';
import ProfileImage from './ProfileImage';
import Button from './Button';
import styles from '../styles/ProfileModal.module.css';

/**
 * 모달 프레임에 들어갈 프로필 모달
 * @param {Object} props.profile - 사용자의 프로필 정보를 담고있는 객체
 * @param {string} props.profile.imageURL - 사용자 프로필 이미지 URL 문자열
 * @param {string} props.profile.userName - 사용자 이름 문자열
 * @param {string} props.profile.email - 사용자 email 문자열
 * @param {string} props.profile.motto - 사용자의 좌우명 문자열
 * @param {string} props.profile.goal - 사용자의 목표 문자열
 */
const ProfileModal = ({ profile }) => {
  const { imageURL, userName, email, motto, goal } = profile;

  const onEditClick = () => {
    // 프로필 수정 폼으로 모달 변경
  };

  const onLogoutClick = () => {
    // 로그아웃 처리
  };

  return (
    <Modal styleName="profile">
      <header className={styles.header}>
        <div className={styles.profile}>
          <ProfileImage imageURL={imageURL} styleName="profileModal" />
        </div>
        <h3 className={styles.name}>{userName}</h3>
        <p className={styles.email}>{email}</p>
      </header>
      <ul className={styles.intros}>
        <li className={styles.intro}>
          <span className={styles.mottoTitle}>MOTTO</span>
          <span className={styles.text}>{motto}</span>
        </li>
        <li className={styles.intro}>
          <span className={styles.goalTitle}>GOAL</span>
          <span className={styles.text}>{goal}</span>
        </li>
      </ul>
      <footer className={styles.footer}>
        <Button styleName="profileModal" onClick={onEditClick}>
          프로필 수정
        </Button>
        <Button styleName="profileModal" onClick={onLogoutClick}>
          로그아웃
        </Button>
      </footer>
    </Modal>
  );
};

export default ProfileModal;
