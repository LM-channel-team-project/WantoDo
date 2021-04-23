import React, { useState } from 'react';
import styles from '../styles/InputBox.module.css';

/**
 * 재사용성을 높인 인풋 박스
 * @param {string} props.labelText - 인풋의 라벨로 표시할 문자열
 * @param {stirng} props.name - label과 input 연결해주는 문자열
 * @param {string} props.type - input의 type 속성 값
 * @param {string} props.placeholder - input의 placeholder 속성 값
 * @param {Function} props.validator - input의 유효성 검사를 수행할 콜백 함수, 반환하는 boolean 값에 따라 상태 변화 여부 결정
 */
const InputBox = ({ labelText, name, type, placeholder, validator }) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    const text = String(event.target.value);

    let validFlag = true;
    if (validator instanceof Function) {
      validFlag = validator(text);
    }

    if (!validFlag) return;

    setValue(text);
  };

  return (
    <label className={styles.inputBox} htmlFor={name}>
      <span className={styles.name}>{labelText || ''}</span>
      <input
        className={styles.input}
        type={type || 'text'}
        name={name}
        placeholder={placeholder || labelText || ''}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default InputBox;
