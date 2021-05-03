import React, { useRef } from 'react';
import InputBox from './InputBox';
import timeparser from '../utils/timestamp-parser';
import styles from '../styles/PeriodsInputBox.module.css';

const PeriodInputBox = ({ periods: { start, end } = {} }) => {
  const startRef = useRef();
  const endRef = useRef();

  const checkValidDate = () => {
    const startDate = Date.parse(startRef.current.value);
    const endDate = Date.parse(endRef.current.value);

    if (!endDate) return true;

    return startDate <= endDate;
  };

  return (
    <div className={styles.box}>
      <span className={styles.label}>기간</span>
      <div className={styles.periods}>
        <InputBox
          value={timeparser.parseDate(start, { isZeroAdded: true })}
          inputRef={startRef}
          labelText="시작"
          inputType="date"
          inputName="date-start"
          validator={checkValidDate}
        />
        <InputBox
          value={timeparser.parseDate(end, { isZeroAdded: true })}
          inputRef={endRef}
          labelText="마침"
          inputType="date"
          inputName="date-end"
          validator={checkValidDate}
        />
      </div>
    </div>
  );
};

export default PeriodInputBox;
