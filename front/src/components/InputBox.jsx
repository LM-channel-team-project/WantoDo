import React from 'react';
import Input from './Input';
import styles from '../styles/InputBox.module.css';

/**
 * 재사용성을 높인 인풋 박스
 * @param {string} props.labelText - 인풋의 라벨로 표시할 문자열
 * @param {string} props.afterText - input 뒤에 부가 설명을 표시하는 문자열
 * @param {string} props.styleName - string, 기본 스타일을 변형할 클래스 이름 문자열
 */
const InputBox = (props) => {
  const { styleName } = props;
  const { labelText, afterText } = props;
  return (
    <label className={`${styles.inputBox} ${styles[styleName]}`} htmlFor={styles.label}>
      <span className={`${styles.name} ${styles[styleName]}`}>{labelText || ''}</span>
      <Input {...props} />
      <span className={styles.text}>{afterText}</span>
    </label>
  );
};

export default InputBox;
