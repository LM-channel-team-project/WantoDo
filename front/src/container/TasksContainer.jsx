import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CategoryDivider from '../components/CategoryDivider';
import QuickAddForm from '../components/QuickAddForm';
import TaskList from '../components/TaskList';
import { actionCreators } from '../store/store';
import styles from '../styles/page/Main.module.css';
import accountManager from '../utils/account-manager';
import timeparser from '../utils/timestamp-parser';

// 테스크를 날짜별로 분류하여 객체로 반환하는 함수
function categorizeTasks(tasks) {
  const cotegorized = Object.keys(tasks).reduce((obj, taskId) => {
    const copied = { ...obj };

    const option = { type: 'array', isZeroAdded: true };
    const start = timeparser.parseDate(tasks[taskId].periods.start, option);
    const end = timeparser.parseDate(tasks[taskId].periods.end, option);

    // 시작일과 종료일 사이 모든 날짜에 task 표시되도록 추가
    for (let i = Number(start.join('')); i <= Number(end.join('')); i += 1) {
      if (copied[i]) copied[i][taskId] = tasks[taskId];
      else copied[i] = { [taskId]: tasks[taskId] };
    }

    return copied;
  }, {});

  return cotegorized;
}

const TasksContainer = ({ tasks, token, updateTasks, getTags }) => {
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

    accountManager.getUserTags(token, getTags);
  }, [token, updateTasks, getTags]);

  const categorized = categorizeTasks(tasks);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>Todo</h2>
      </header>
      <ol className={styles.content}>
        {Object.keys(categorized).map((day) => {
          const dateObj = timeparser.categorize(day);

          const month = timeparser.parseMonthIndex(dateObj.month, 'eng');
          const { date } = dateObj;

          return (
            <li key={day}>
              <CategoryDivider styleName="taskContainer">
                <span>{date}</span>
                <span>{month}</span>
              </CategoryDivider>
              <TaskList tasks={categorized[day]} />
            </li>
          );
        })}
      </ol>
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
    getTags: (tags) => dispatch(actionCreators.getTags(tags)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksContainer);
