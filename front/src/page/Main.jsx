import React from 'react';
import Calendar from '../components/Calendar';
import QuickAddForm from '../components/QuickAddForm';
import TaskList from '../components/TaskList';
import Layout from '../container/Layout';
import Navbar from '../container/Navbar';
import styles from '../styles/page/Main.module.css';

const Left = ({ tasks }) => {
  return (
    <div className={styles.left}>
      <header className={styles.left__header}>
        <h2>Todo</h2>
      </header>
      <div className={styles.left__content}>
        <TaskList tasks={tasks} />
      </div>
      <footer className={styles.left__footer}>
        <QuickAddForm />
      </footer>
    </div>
  );
};

const Main = ({ profile, tasks }) => (
  <Layout
    Side={() => <Navbar profileURL={profile.imageURL} />}
    Left={() => <Left tasks={tasks} />}
    Right={() => <Calendar />}
  />
);

export default Main;
