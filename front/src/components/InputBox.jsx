import React from 'react';
import Input from './Input';
import styles from '../styles/InputBox.module.css';

/**
 * 재사용성을 높인 인풋 박스
 * @param {string} props.labelText - 인풋의 라벨로 표시할 문자열
 * @param {stirng} props.inputType - input의 type 속성 값
 * @param {string} props.inputName - form에서 모든 input의 값을 객체로 받을 때 key로 쓰일 문자열
 * @param {string} props.afterText - input 뒤에 부가 설명을 표시하는 문자열
 * @param {string} props.placeholder - input의 placeholder 속성 값
 * @param {Function} props.validator - input의 유효성 검사를 수행할 콜백 함수, 반환하는 boolean 값에 따라 상태 변화 여부 결정
 */
const InputBox = ({
  labelText,
  inputType,
  inputName,
  afterText,
  validator,
  placeholder,
  styleName,
  rows,
  cols,
}) => {
  return (
    <label className={`${styles.inputBox} ${styles.styleName}`} htmlFor={styles.label}>
      <span className={styles.name}>{labelText || ''}</span>
      <Input
        id={styles.label}
        name={inputName}
        type={inputType}
        placeholder={placeholder}
        validator={validator}
        styleName={styleName}
        rows={rows}
        cols={cols}
      />
      <span className={styles.text}>{afterText}</span>
    </label>
  );
};

export default InputBox;
