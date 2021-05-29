import React from 'react';
import generateId from 'utils/id-generator';
import BoxStyles from 'components/Global/InputBox/styles.module.css';
import styles from 'components/Global/Input/styles.module.css';

const NumberInput = ({ value, styleName, name, size, afterText, onChange, onArrowUpOrDown }) => {
  const { length } = String(value);
  const zeroAdded = length < size ? `${'0'.repeat(size - length)}${value}` : value;

  const onKeyDown = (event) => {
    const { key } = event;

    if (key === 'ArrowUp' || key === 'ArrowDown') {
      if (onArrowUpOrDown instanceof Function) onArrowUpOrDown(event);
    }
  };

  const id = generateId();

  return (
    <label htmlFor={id}>
      <input
        className={`${styles.input} ${styles[styleName]}`}
        id={id}
        type="text"
        name={name}
        value={zeroAdded}
        size={size}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <span className={BoxStyles.name}>{afterText}</span>
    </label>
  );
};

export default NumberInput;
