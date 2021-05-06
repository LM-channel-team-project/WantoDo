import React, { useState } from 'react';
import styles from '../styles/Input.module.css';
import BoxStyles from '../styles/InputBox.module.css';

const NumberInput = ({ inputRef, value, styleName, name, size, afterText }) => {
  const [number, setNumber] = useState(value || 0);

  const onKeyDown = (event) => {
    event.preventDefault();

    const { key } = event;

    if (key === 'ArrowUp') {
      setNumber(number + 1);
    } else if (key === 'ArrowDown') {
      setNumber(number > 0 ? number - 1 : number);
    }
  };

  return (
    <label htmlFor={styles[name]}>
      <input
        ref={inputRef}
        className={`${styles.input} ${styles[styleName]}`}
        id={styles[name]}
        type="text"
        name={name}
        value={'0'.repeat(size - String(number).length) + String(number)}
        size={size}
        onKeyDown={onKeyDown}
        onChange={() => {}}
      />
      <span className={BoxStyles.name}>{afterText}</span>
    </label>
  );
};

export default NumberInput;
