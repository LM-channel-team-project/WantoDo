import React from 'react';
import { connect } from 'react-redux';
import { actionCreators } from 'store/store';
import QuickAddForm from 'components/Global/QuickAddForm';
import accountManager from 'utils/account-manager';
import timeparser from 'utils/timestamp-parser';
import useInput from 'hooks/useInput';
import styles from 'components/Main/styles.module.css';

const QuickAddLayout = ({ title, children, token, addTask, openDetailModal, setAlert }) => {
  const { value: content, onChange, reset } = useInput();

  const onSubmit = async (event) => {
    event.preventDefault();

    if (content.length < 1) {
      setAlert({ display: true, message: '내용을 입력 해주세요', confirm: '확인' });
      return;
    }

    const currentTime = timeparser.getTimestampBySecs(Date.now());
    const task = {
      content,
      periods: { start: currentTime, end: currentTime },
    };

    const taskId = await accountManager.addTask(token, task);
    addTask(taskId, task);

    reset();
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
      </header>
      <section className={styles.content}>{children}</section>
      <footer className={styles.footer}>
        <QuickAddForm
          value={content}
          onChange={onChange}
          placeholder="나의 할 일 작성하기"
          onSubmit={onSubmit}
          isDetailButton
          onDetailClick={(task) => {
            openDetailModal(task);
            reset();
          }}
          setAlert={setAlert}
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

export default connect(mapStateToProps, mapDispatchToProps)(QuickAddLayout);
