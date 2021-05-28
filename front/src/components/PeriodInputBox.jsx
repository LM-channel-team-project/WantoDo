import React from 'react';
import DateInputBox from './DateInputBox';
import styles from '../styles/PeriodsInputBox.module.css';

const PeriodInputBox = ({ periods = {}, changePeriods }) => {
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
          value={periods.start}
          labelText="시작"
          name="start"
          validator={checkValidDate}
          changeDate={changePeriods.start}
        />
        <DateInputBox
          value={periods.end}
          labelText="마침"
          name="end"
          validator={checkValidDate}
          changeDate={changePeriods.end}
        />
      </div>
    </div>
  );
};

export default PeriodInputBox;
