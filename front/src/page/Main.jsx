import React from 'react';
import Calendar from '../components/Calendar';
import QuickAddForm from '../components/QuickAddForm';
import TaskList from '../components/TaskList';
import Layout from '../container/Layout';
import Navbar from '../container/Navbar';
import TaskModal from '../container/TaskModal';
import ProfileModal from '../components/ProfileModal';
import styles from '../styles/page/Main.module.css';

const Left = ({ tasks }) => {
  return (
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
};

const Right = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>Monthly</h2>
      </header>
      <div className={styles.content}>
        <Calendar />
      </div>
    </div>
  );
};

const Main = ({ profile, tasks }) => (
  <>
    <Layout
      Side={() => <Navbar profileURL={profile.imageURL} />}
      Left={() => <Left tasks={tasks} />}
      Right={() => <Right />}
    >
      <ProfileModal profile={profile} />
      <TaskModal />
    </Layout>
  </>
);

export default Main;
