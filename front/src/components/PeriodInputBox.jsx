import React from 'react';
import styles from '../styles/PeriodsInputBox.module.css';
import DateInputBox from './DateInputBox';

const PeriodInputBox = ({ refs: { startRef, endRef }, periods: { start, end } = {} }) => {
  const checkValidDate = () => {
    // const startDate = Date.parse(startRef.current.value);
    // const endDate = Date.parse(endRef.current.value);
    // if (!endDate) return true;
    // return startDate <= endDate;
  };

  return (
    <div className={styles.box}>
      <span className={styles.label}>기간</span>
      <div className={styles.periods}>
        <DateInputBox
          value={start}
          inputRef={startRef}
          labelText="시작:"
          inputType="date"
          inputName="date-start"
          validator={checkValidDate}
        />
        <DateInputBox
          value={end}
          inputRef={endRef}
          labelText="마침:"
          inputType="date"
          inputName="date-end"
          validator={checkValidDate}
        />
      </div>
    </div>
  );
};

export default PeriodInputBox;
