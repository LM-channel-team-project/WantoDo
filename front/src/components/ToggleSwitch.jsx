import React, { useState } from 'react';
import styles from '../styles/ToggleSwitch.module.css';

const ToggleSwitch = ({ name, switchOn, onClick }) => {
  const [on, setOn] = useState(switchOn);
  const switchClass = on ? styles.on : '';
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.line}
        onClick={(event) => {
          if (onClick instanceof Function) onClick(event, name, !on);
          setOn(!on);
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
