import React from 'react';
import styles from '../styles/CategoryDivider.module.css';

const CategoryDivider = ({ children, styleName, date }) => (
  <div className={`${styles.divider} ${styles[styleName]}`} data-date={date}>
    <div className={`${styles.content} ${styles[styleName]}`}>{children}</div>
    <hr className={`${styles.line} ${styles[styleName]}`} />
  </div>
);

export default CategoryDivider;
