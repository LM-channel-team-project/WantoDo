import React from 'react';
import Calendar from '../components/Calendar';
import styles from '../styles/page/Main.module.css';

const CalendarContainer = () => (
  <div className={styles.container}>
    <header className={styles.header}>
      <h2 className={styles.title}>Monthly</h2>
    </header>
    <div className={styles.content}>
      <Calendar />
    </div>
  </div>
);

export default CalendarContainer;
