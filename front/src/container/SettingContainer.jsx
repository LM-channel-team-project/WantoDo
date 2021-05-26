import React from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store/store';
import QuickAddForm from '../components/QuickAddForm';
import ToggleSwitch from '../components/ToggleSwitch';
import styles from '../styles/page/Main.module.css';
import accountManager from '../utils/account-manager';
import Button from '../components/Button';

const SettingContainer = ({
  settings,
  token,
  editSetting,
  addTask,
  openWidrawalModal,
  openDetailModal,
}) => {
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

  const onSubmit = async (content) => {
    const currentTime = Date.now();
    const task = {
      content,
      periods: { start: currentTime, end: currentTime },
    };

    const taskId = await accountManager.addTask(token, task);
    addTask(taskId, task);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>Setting</h2>
      </header>
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
      <footer className={styles.footer}>
        <QuickAddForm
          placeholder="나의 할 일 작성하기"
          isDetailButton
          onDetailClick={openDetailModal}
          onSubmit={onSubmit}
        />
      </footer>
    </div>
  );
};

const mapStateToProps = ({ profile, token }) => {
  return { settings: profile.settings, token };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editSetting: (settings) => dispatch(actionCreators.editSetting(settings)),
    addTask: (taskId, task) => dispatch(actionCreators.addTask(taskId, task)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingContainer);
