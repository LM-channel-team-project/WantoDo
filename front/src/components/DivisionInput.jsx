import React, { useState } from 'react';
import styles from '../styles/Input.module.css';

const DivisionInput = ({ inputRef, value, styleName, name }) => {
  const [division, setDivision] = useState(value || 'am');

  const onKeyDown = (event) => {
    event.preventDefault();
    const { key } = event;
    if (key !== 'ArrowUp' && key !== 'ArrowDown') return;
    setDivision(division === 'am' ? 'pm' : 'am');
  };

  return (
    <input
      ref={inputRef}
      className={`${styles.input} ${styles[styleName]}`}
      type="text"
      name={name}
      value={division.toUpperCase()}
      size={3}
      onKeyDown={onKeyDown}
      onChange={() => {}}
    />
  );
};

export default DivisionInput;
