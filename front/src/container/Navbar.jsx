import React from 'react';
import { connect } from 'react-redux';
import { IoCalendarOutline } from 'react-icons/io5';
import { MdViewWeek } from 'react-icons/md';
import { CgToday } from 'react-icons/cg';
import { BsCardChecklist } from 'react-icons/bs';
import { AiFillSetting, AiFillTags } from 'react-icons/ai';
import { actionCreators } from '../store/store';
import ProfileButon from '../components/ProfileButon';
import MenuSelector from '../components/MenuSelector';
import IconButton from '../components/IconButton';
import styles from '../styles/Navbar.module.css';
import { modals } from '../reducer/modal';

/**
 * 사이드 네비게이션 바
 * @param {string | undefined} profileURL - 사용자의 프로필 이미지 URL, 없을 경우 기본 이미지 표시
 * @param {Function} toggleProfileModal - 전역 모달 상태를 변경하여 프로필 모달 토글하는 함수
 */
const Navbar = ({ imageURL, toggleModal, changeLeft }) => {
  const onProfileClick = () => {
    toggleModal(modals.profile);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.top}>
        <div>
          <ProfileButon imageURL={imageURL} styleName="profile" onClick={onProfileClick} />
        </div>
        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <MenuSelector
              iconList={{ IoCalendarOutline, MdViewWeek, CgToday }}
              styleName="sideMenu"
            />
          </li>
          <li className={styles.menuItem}>
            <MenuSelector
              iconList={{ tasks: BsCardChecklist }}
              styleName="sideMenu"
              onClick={(name) => changeLeft(name)}
            />
          </li>
          <li className={styles.menuItem}>
            <MenuSelector
              iconList={{ tags: AiFillTags }}
              styleName="sideMenu"
              onClick={() => toggleModal(modals.tags)}
            />
          </li>
        </ul>
      </div>
      <div className={styles.setting}>
        <IconButton
          Icon={AiFillSetting}
          styleName="setting"
          onClick={() => changeLeft('setting')}
        />
      </div>
    </nav>
  );
};

const mapStateToProps = ({ profile: { imageURL } }) => {
  return { imageURL };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleModal: (modal) => dispatch(actionCreators.toggleModal(modal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
