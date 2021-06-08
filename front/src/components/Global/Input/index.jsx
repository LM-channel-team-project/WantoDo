import React from 'react';
import styles from './styles.module.css';

/**
 * 재사용성을 높인 인풋 박스
 * @param {Object} props - input에 전달되는 속성을 담고 있는 객체
 * @param {stirng} props.type - input의 type 속성 값
 * @param {stirng} props.styleName - 별도의 클래스를 지정하는 문자열
 * @param {string} props.rows - type이 textarea일 때, 설정되는 row 개수
 * @param {string} props.cols - type이 textarea일 때, 설정되는 column 개수
 * @param {string} props.onChange - input의 value 컨트롤러 함수
 * @param {Function} props.validator - input의 유효성 검사를 수행할 콜백 함수, 반환하는 boolean 값에 따라 상태 변화 여부 결정
 * @param {Object} props.props - 명시된 속성 외에 input에 전달되는 속성을 담고 있는 객체
 */
const Input = ({ type, styleName, rows, cols, onChange, validator, ...props }) => {
  const onValueChange = (event) => {
    const inputValue = event.target.value;

    let validFlag = true;
    if (validator instanceof Function) {
      validFlag = validator(inputValue);
    }

    if (!validFlag) return;

    onChange(event);
  };

  const initialProps = {
    className: `${styles.input} ${styles[styleName]}`,
    type: type || 'text',
    autoComplete: 'off',
    rows: type === 'textarea' ? rows : '',
    cols: type === 'textarea' ? cols : '',
    onChange: onValueChange,
  };

  return type === 'textarea' ? (
    <textarea {...initialProps} {...props} />
  ) : (
    <input {...initialProps} {...props} />
  );
};

export default Input;
