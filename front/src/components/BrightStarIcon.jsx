import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import styles from '../styles/BrightStarIcon.module.css';

// Created by 오영롱(youngrongoh) on 2021/04/20
// react-icons 라이브러리에 적절한 아이콘이 없어 임시로 만든 아이콘
const BrightStarIcon = ({ size, className }) => (
  <div style={{ fontSize: size }} className={`${styles.icon} ${className && styles.light}`}>
    <AiFillStar className={`${styles.star} ${className}`} />
    <div className={styles.decoration} />
  </div>
);

export default BrightStarIcon;
