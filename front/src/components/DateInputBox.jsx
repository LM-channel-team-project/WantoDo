import React from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import timeparser from '../utils/timestamp-parser';
import NumberInput from './NumberInput';
import DivisionInput from './DivisionInput';
import IconButton from './IconButton';
import styles from '../styles/DateInputBox.module.css';

const DateInputBox = ({ inputRef, value, labelText, inputName }) => {
  const { year, month, date, hours, mins, division } = timeparser.parseDate(value, {
    type: 'object',
    isTime: true,
    is12Hours: true,
  });

  return (
    <div className={styles.box}>
      <span>{labelText}</span>
      <div className={styles.date}>
        <NumberInput
          inputRef={inputRef.year}
          type="number"
          value={year}
          name={`${inputName}-year`}
          afterText="년"
          size="4"
        />
        <NumberInput
          inputRef={inputRef.month}
          type="number"
          value={month}
          name={`${inputName}-month`}
          afterText="월"
          size="2"
        />
        <NumberInput
          inputRef={inputRef.date}
          type="number"
          value={date}
          name={`${inputName}-date`}
          afterText="일"
          size="2"
        />
      </div>
      <div className={styles.time}>
        <NumberInput
          inputRef={inputRef.hours}
          type="number"
          value={hours}
          name={`${inputName}-hours`}
          afterText="시"
          size="2"
        />
        <NumberInput
          inputRef={inputRef.mins}
          type="number"
          value={mins}
          name={`${inputName}-mins`}
          afterText="분"
          size="2"
        />
        <DivisionInput
          inputRef={inputRef.division}
          value={division}
          name={`${inputName}-division`}
        />
      </div>
      <IconButton Icon={AiOutlineCalendar} />
    </div>
  );
};

export default DateInputBox;