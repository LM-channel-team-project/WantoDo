import React from 'react';
import styles from '../styles/Layout.module.css';

const Layout = ({ Side, Left, Right, Full, children, closeModal }) => {
  const modalClickHandler = (event) => {
    const opendCount = children.filter((modal) => modal !== false).length;
    // 열려있는 모달이 있을 때만 closeModal 호출
    // event.preventDefault를 호출한 하위 컴포넌트에서 발생한 이벤트 버블링을 차단
    if (!event.defaultPrevented && opendCount > 0) closeModal();
  };

  return (
    <div
      className={styles.container}
      onClick={modalClickHandler}
      role="button"
      tabIndex="0"
      onKeyPress={() => {}}
    >
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
