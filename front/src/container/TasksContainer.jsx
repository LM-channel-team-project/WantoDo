import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import QuickAddForm from '../components/QuickAddForm';
import TaskList from '../components/TaskList';
import { actionCreators } from '../store/store';
import styles from '../styles/page/Main.module.css';
import accountManager from '../utils/account-manager';

const TasksContainer = ({ tasks, token, updateTasks }) => {
  useEffect(() => {
    if (!token) return;
    const now = new Date();
    // 현재 날짜를 기준으로 한 달 분량의 tasks를 받아옴
    accountManager.getUserTasks(
      token,
      {
        year: now.getFullYear(),
        month: now.getMonth(),
      },
      updateTasks,
    );
  }, [token, updateTasks]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>Todo</h2>
      </header>
      <div className={styles.content}>
        <TaskList tasks={tasks} />
      </div>
      <footer className={styles.footer}>
        <QuickAddForm token={token} />
      </footer>
    </div>
  );
};

const mapStateToProps = ({ tasks, token }) => {
  return { tasks, token };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTasks: (tasks) => dispatch(actionCreators.updateTasks(tasks)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksContainer);
