import React from 'react';
import { connect } from 'react-redux';
import QuickAddForm from '../components/QuickAddForm';
import TaskList from '../components/TaskList';
import styles from '../styles/page/Main.module.css';

const TasksContainer = ({ tasks }) => (
  <div className={styles.container}>
    <header className={styles.header}>
      <h2 className={styles.title}>Todo</h2>
    </header>
    <div className={styles.content}>
      <TaskList tasks={tasks} />
    </div>
    <footer className={styles.footer}>
      <QuickAddForm />
    </footer>
  </div>
);

const mapStateToProps = ({ tasks }) => {
  return { tasks };
};

export default connect(mapStateToProps)(TasksContainer);
