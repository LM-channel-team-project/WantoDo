import React, { useState } from 'react';
import styles from '../styles/Input.module.css';

const useFlexInputSize = (intialSize) => {
  const [inputSize, setInputSize] = useState(intialSize);

  const flexInputSize = (length) => {
    if (length === 0) {
      setInputSize(intialSize);
      return;
    }
    setInputSize(length);
  };

  return { inputSize, flexInputSize };
};
/**
 * 재사용성을 높인 인풋 박스
 * @param {string} props.id - label과 input 연결해주는 고유한 id 문자열
 * @param {stirng} props.type - input의 type 속성 값
 * @param {string} props.name - form에서 모든 input의 값을 객체로 받을 때 key로 쓰일 문자열
 * @param {string} props.placeholder - input의 placeholder 속성 값
 * @param {Function} props.validator - input의 유효성 검사를 수행할 콜백 함수, 반환하는 boolean 값에 따라 상태 변화 여부 결정
 */
const Input = ({ id, name, type, placeholder, validator, styleName, rows, cols, onChange }) => {
  const [value, setValue] = useState('');
  const { inputSize, flexInputSize } = useFlexInputSize(3);

  const onValueChange = (event) => {
    const text = String(event.target.value);

    let validFlag = true;
    if (validator instanceof Function) {
      validFlag = validator(text);
    }

    if (!validFlag) return;

    if (styleName === 'tagInput') {
      flexInputSize(text.length);
    }

    setValue(text);
    if (onChange instanceof Function) onChange(event);
  };

  const props = {
    id,
    value,
    className: `${styles.input} ${styles[styleName]}`,
    type: type || 'text',
    name: name || 'input',
    placeholder: placeholder || '',
    autocomplete: 'off',
    size: styleName === 'tagInput' && inputSize,
    rows: type === 'textarea' && rows,
    cols: type === 'textarea' && cols,
    onChange: onValueChange,
  };

  return type === 'textarea' ? <textarea {...props} /> : <input {...props} />;
};

export default Input;
