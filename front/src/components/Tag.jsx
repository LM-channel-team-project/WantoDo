import React from 'react';
import styles from '../styles/Tag.module.css';
import colorManager from '../utils/color-manager';

/** Created by 오영롱(youngrongoh) on 2021/04/23
 * 태스크의 태그를 나타내는 컴포넌트
 * @param {string} props.name - 태그 이름 문자열
 * @param {string} props.color - 태그 색상 문자열, css에 정의된 색상명만 사용 가능
 * @param {ReactElement} props.children - 컴포넌트의 자식 요소
 * @param {string} props.styleName - 스타일링 변화를 줄 때 사용되는 클래스명 문자열
 */
const Tag = ({ name, color = '', children, styleName }) => {
  const colorName = color.includes('#') ? colorManager.toName(color) : color;
  return (
    <div className={`${styles.tag} ${styles[colorName || '']} ${styles[styleName]}`}>
      <span className={styles.name}>{name}</span>
      {children}
    </div>
  );
};

export default Tag;
