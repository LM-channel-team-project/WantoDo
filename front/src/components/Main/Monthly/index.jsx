import React from 'react';
import styles from 'components/Main/styles.module.css';
import Calendar from 'components/Main/Monthly/Calendar';

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
