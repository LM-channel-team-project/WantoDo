import React from 'react';
import styles from '../styles/Layout.module.css';

const Layout = ({ Side, Left, Right, children }) => {
  return (
    <div className={styles.container}>
      <aside className={styles.side}>{Side instanceof Function && Side()}</aside>
      <section className={styles.main}>
        <div className={styles.left}>{Left instanceof Function && Left()}</div>
        <div className={styles.right}>{Right instanceof Function && Right()}</div>
      </section>
      {children}
    </div>
  );
};

export default Layout;
