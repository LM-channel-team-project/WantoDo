import React, { useState } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import NumberInput from 'components/Main/TaskModal/NumberInput';
import DivisionInput from 'components/Main/TaskModal/DivisionInput';
import IconButton from 'components/Global/IconButton';
import CalendarInputModal from 'components/Main/TaskModal/CalendarInputModal';
import timeparser from 'utils/timestamp-parser';
import styles from './styles.module.css';

const getDateObj = (timestamp) =>
  timeparser.parseDate(timestamp, {
    type: 'object',
    isTime: true,
    is12Hours: true,
  });

const DateInputBox = ({ value: timestamp, labelText, name: inputName, changeDate, validator }) => {
  const [modal, setModal] = useState(false);
  const date = getDateObj(timestamp);

  const nowDate = new Date(timestamp);
  const lastDate = new Date(date.yaer, nowDate.setMonth(date.month), 0);

  const getValidData = (compared, updated) => (validator(updated, inputName) ? updated : compared);

  const onChange = (event) => {
    const { name, value } = event.target;

    changeDate((prevTimestamp) => {
      const prev = getDateObj(prevTimestamp);
      const updated = { ...prev, [name]: value };

      const newTimestamp = timeparser.toTimestamp(updated, { is12Hours: true, isTime: true });
      return getValidData(prevTimestamp, newTimestamp);
    });
  };

  const onKeyDown = (event) => {
    const { name, value } = event.target;
    const { key } = event;

    let changed;

    const num = Number(value);
    if (key === 'ArrowUp') changed = num + 1;
    if (key === 'ArrowDown') changed = num > 0 ? num - 1 : num;

    switch (name) {
      case 'year':
        changed = changed > 9999 ? 9999 : changed;
        break;
      case 'month':
        changed = changed > 12 ? 1 : changed;
        break;
      case 'date':
        changed = changed > lastDate.getDate() ? 1 : changed;
        break;
      case 'hours':
        changed = changed > 12 ? 1 : changed;
        break;
      case 'mins':
        changed = changed > 60 ? 1 : changed;
        break;
      default:
        break;
    }

    changeDate((prevTimestamp) => {
      const prev = getDateObj(prevTimestamp);
      const updated = { ...prev, [name]: changed };

      const newTimestamp = timeparser.toTimestamp(updated, { is12Hours: true, isTime: true });

      return getValidData(prevTimestamp, newTimestamp);
    });
  };

  const onDisivionKeyDown = (event) => {
    const { name } = event.target;
    const newTimestamp = timeparser.toTimestamp(
      { ...date, [name]: !date.am },
      { is12Hours: true, isTime: true },
    );

    changeDate((prevTimestamp) => getValidData(prevTimestamp, newTimestamp));
  };

  const onSelect = (dateStr) => {
    const newTimestamp = timeparser.toTimestamp(dateStr, { separator: '-' });
    changeDate((prevTimestamp) => getValidData(prevTimestamp, newTimestamp));
    setModal(false);
  };

  return (
    <>
      <div className={styles.box}>
        <span className={styles.text}>{labelText}</span>
        <div className={styles.date}>
          <NumberInput
            styleName="year"
            value={date.year}
            name="year"
            afterText="년"
            size="4"
            onChange={onChange}
            onArrowUpOrDown={onKeyDown}
          />
          <NumberInput
            styleName="month"
            value={date.month}
            name="month"
            afterText="월"
            size="2"
            onChange={onChange}
            onArrowUpOrDown={onKeyDown}
          />
          <NumberInput
            styleName="date"
            value={date.date}
            name="date"
            afterText="일"
            size="2"
            onChange={onChange}
            onArrowUpOrDown={onKeyDown}
          />
        </div>
        <IconButton
          styleName="calendar"
          Icon={AiOutlineCalendar}
          onClick={() => {
            setModal(true);
          }}
        />
        <div className={styles.time}>
          <NumberInput
            styleName="hour"
            value={date.hours}
            name="hours"
            afterText="시"
            size="2"
            onChange={onChange}
            onArrowUpOrDown={onKeyDown}
          />
          <NumberInput
            styleName="min"
            value={date.mins}
            name="mins"
            afterText="분"
            size="2"
            onChange={onChange}
            onArrowUpOrDown={onKeyDown}
          />
          <DivisionInput
            styleName="division"
            value={date.am}
            name="am"
            onChange={onChange}
            onArrowUpOrDown={onDisivionKeyDown}
          />
        </div>
        {modal && <CalendarInputModal onSelect={onSelect} name={inputName} />}
      </div>
      {modal && (
        <div
          className={styles.modalBackground}
          onClick={() => setModal(false)}
          onKeyPress={() => {}}
          tabIndex="0"
          role="button"
        >
          <br className={styles.hidden} />
        </div>
      )}
    </>
  );
};

export default DateInputBox;
