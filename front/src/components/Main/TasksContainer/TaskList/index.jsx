import React from 'react';
import TaskItem from 'components/Main/TasksContainer/TaskItem';
import styles from './styles.module.css';
/** Created by 오영롱(youngrongoh) on 2021/04/20
 * 태스크 리스트
 * @param {Object} props.tasks - 사용자의 태스크 정보를 담고 있는 리스트 객체
 */
const TaskList = ({ tasks = {}, type, openModal }) => (
  <ol className={styles.list}>
    {Object.keys(tasks)
      .sort((a, b) => tasks[a].periods.start - tasks[b].periods.start) // 시간순 정렬
      .map((key) => (
        <TaskItem key={key} taskId={key} task={tasks[key]} type={type} openModal={openModal} />
      ))}
  </ol>
);

export default TaskList;
