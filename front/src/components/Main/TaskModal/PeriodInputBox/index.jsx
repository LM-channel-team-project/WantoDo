import React from 'react';
import DateInputBox from 'components/Main/TaskModal/DateInputBox';
import timeparser from 'utils/timestamp-parser';
import styles from './styles.module.css';

const setTimeBySecs = (time) => timeparser.getTimestampBySecs(time);

const PeriodInputBox = ({ periods = {}, changePeriods, setAlert }) => {
  const alert = {
    display: true,
    message: '',
    confirm: '확인',
  };

  const checkValidation = (timestamp, name) => {
    const compared = setTimeBySecs(timestamp);

    let isValid = false;
    if (name === 'start') {
      if (compared <= setTimeBySecs(periods.end)) isValid = true;
      alert.message = '시작일이 종료일보다 늦을 수 없습니다.';
    } else {
      if (compared >= setTimeBySecs(periods.start)) isValid = true;
      alert.message = '종료일이 시작일보다 빠를 수 없습니다.';
    }

    if (!isValid) setAlert(alert);
    return isValid;
  };

  return (
    <div className={styles.box}>
      <span className={styles.label}>기간</span>
      <div className={styles.periods}>
        <DateInputBox
          value={periods.start}
          labelText="시작"
          name="start"
          validator={checkValidation}
          changeDate={changePeriods.start}
        />
        <DateInputBox
          value={periods.end}
          labelText="마침"
          name="end"
          validator={checkValidation}
          changeDate={changePeriods.end}
        />
      </div>
    </div>
  );
};

export default PeriodInputBox;
