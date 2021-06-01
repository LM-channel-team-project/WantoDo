import React from 'react';
import { connect } from 'react-redux';
import { actionCreators } from 'store/store';
import accountManager from 'utils/account-manager';
import ToggleSwitch from 'components/Main/Setting/ToggleSwitch';
import Button from 'components/Global/Button';
import styles from 'components/Main/styles.module.css';

const SettingContainer = ({ settings, token, editSetting, openWidrawalModal }) => {
  const { theme, isNotification, beginningOfWeek } = settings;
  const onToggleClick = (_, name, switchOn) => {
    let value;
    switch (name) {
      case 'theme':
        value = switchOn ? 'dark' : 'default';
        break;
      case 'isNotification':
        value = switchOn;
        break;
      case 'beginningOfWeek':
        value = switchOn ? 'monday' : 'sunday';
        break;
      default:
        throw new Error(`invalid name: ${name}`);
    }
    accountManager.editSetting(token, { [name]: value });
    editSetting({ ...settings, [name]: value });
  };

  return (
    <ul className={styles.content}>
      <li className={styles.item}>
        <span>다크모드</span>
        <ToggleSwitch name="theme" switchOn={theme === 'dark'} onClick={onToggleClick} />
      </li>
      <li className={styles.item}>
        <span>알림 받기</span>
        <ToggleSwitch name="isNotification" switchOn={isNotification} onClick={onToggleClick} />
      </li>
      <li className={styles.item}>
        <span>한주의 시작</span>
        <ToggleSwitch
          name="beginningOfWeek"
          switchOn={beginningOfWeek === 'monday'}
          onClick={onToggleClick}
        />
      </li>
      <li className={styles.item}>
        <Button styleName="withdrawal" onClick={openWidrawalModal}>
          계정 삭제하기
        </Button>
      </li>
    </ul>
  );
};

const mapStateToProps = ({ profile, token }) => {
  return { settings: profile.settings, token };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editSetting: (settings) => dispatch(actionCreators.editSetting(settings)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingContainer);
