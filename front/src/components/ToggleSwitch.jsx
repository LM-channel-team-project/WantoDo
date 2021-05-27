import React, { useState } from 'react';
import styles from '../styles/ToggleSwitch.module.css';

const ToggleSwitch = ({ name, switchOff, onClick }) => {
  const [off, setOff] = useState(switchOff);
  const switchClass = off ? styles.off : '';
  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.line} ${switchClass}`}
        onClick={(event) => {
          if (onClick instanceof Function) onClick(event, name, !off);
          setOff(!off);
        }}
        onKeyPress={() => {}}
        role="button"
        tabIndex="0"
      >
        <div className={`${styles.switch} ${switchClass}`} />
      </div>
    </div>
  );
};

export default ToggleSwitch;
