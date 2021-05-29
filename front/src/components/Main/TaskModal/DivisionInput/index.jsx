import React from 'react';
import styles from 'components/Global/Input/styles.module.css';

const DivisionInput = ({ value, styleName, name, onChange: changeValue, onArrowUpOrDown }) => {
  const converted = value ? 'AM' : 'PM';

  const onChange = (event) => {
    if (event.target.value) return;

    if (changeValue instanceof Function) changeValue(event);
  };

  const onKeyDown = (event) => {
    event.preventDefault();

    const { key } = event;

    if (key !== 'ArrowUp' && key !== 'ArrowDown') return;
    if (onArrowUpOrDown instanceof Function) onArrowUpOrDown(event);
  };

  return (
    <input
      className={`${styles.input} ${styles[styleName]}`}
      type="text"
      name={name}
      value={converted.toUpperCase()}
      size={3}
      onKeyDown={onKeyDown}
      onChange={onChange}
    />
  );
};

export default DivisionInput;
