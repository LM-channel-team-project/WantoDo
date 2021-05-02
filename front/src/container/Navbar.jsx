import React from 'react';
import { connect } from 'react-redux';
import { IoCalendarOutline } from 'react-icons/io5';
import { MdViewWeek } from 'react-icons/md';
import { CgToday } from 'react-icons/cg';
import { BsCardChecklist } from 'react-icons/bs';
import { AiFillSetting } from 'react-icons/ai';
import ProfileButon from '../components/ProfileButon';
import MenuSelector from '../components/MenuSelector';
import IconButton from '../components/IconButton';
import styles from '../styles/Navbar.module.css';

/**
 * 사이드 네비게이션 바
 * @param {string | undefined} profileURL - 사용자의 프로필 이미지 URL, 없을 경우 기본 이미지 표시
 */
const Navbar = ({ profileURL }) => {
  const onSettingClick = () => {
    // 여기서 설정 컴포넌트 표시
  };

  const onProfileClick = () => {
    // 여기서 프로필 모달 토글
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.top}>
        <div>
          <ProfileButon imageURL={profileURL} styleName="profile" onClick={onProfileClick} />
        </div>
        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <MenuSelector
              iconList={{ IoCalendarOutline, MdViewWeek, CgToday }}
              styleName="sideMenu"
            />
          </li>
          <li className={styles.menuItem}>
            <MenuSelector iconList={{ BsCardChecklist }} styleName="sideMenu" />
          </li>
        </ul>
      </div>
      <div className={styles.setting}>
        <IconButton Icon={AiFillSetting} styleName="setting" onClick={onSettingClick} />
      </div>
    </nav>
  );
};

const mapStateToProps = ({ profile: { imageURL } }) => {
  return { profileURL: imageURL };
};

export default connect(mapStateToProps)(Navbar);
