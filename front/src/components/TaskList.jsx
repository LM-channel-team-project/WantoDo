import React from 'react';
import TaskItem from './TaskItem';
import styles from '../styles/TaskList.module.css';
/**
 * 태스크 리스트
 * @param {Object} props.tasks - 사용자의 태스크 정보를 담고 있는 리스트 객체
 */
const TaskList = ({ tasks }) => (
  <ol className={styles.list}>
    {Object.keys(tasks).map((key) => (
      <TaskItem key={key} task={tasks[key]} type="daily" />
    ))}
  </ol>
);

export default TaskList;
