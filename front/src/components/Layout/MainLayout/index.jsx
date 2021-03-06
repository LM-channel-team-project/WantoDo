import React from 'react';
import styles from './styles.module.css';

const Layout = ({ Side, Left, Right, Full, children }) => {
  return (
    <div className={styles.container}>
      <aside className={styles.side}>{Side instanceof Function && Side()}</aside>
      <section className={`${styles.main} ${Full ? '' : styles.split}`}>
        {Full && Full()}
        {!Full && (
          <>
            <div className={styles.left}>{Left instanceof Function && Left()}</div>
            <div className={styles.right}>{Right instanceof Function && Right()}</div>
          </>
        )}
      </section>
      {children}
    </div>
  );
};

export default Layout;
