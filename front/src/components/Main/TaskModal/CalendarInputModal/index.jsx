import React from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import IconButton from 'components/Global/IconButton';
import Modal from 'components/Layout/Modal';
import Button from 'components/Global/Button';
import timeparser from 'utils/timestamp-parser';
import useCalendar from 'hooks/useCalendar';
import styles from './styles.module.css';

const CalendarInputModal = ({ name, onSelect }) => {
  const {
    calendarRows,
    selectedDate,
    todayFormatted,
    daysShort,
    getNextMonth,
    getPrevMonth,
  } = useCalendar();

  return (
    <Modal styleName={`calendarInputModal${name ? `__${name}` : ''}`}>
      <div className={styles.header}>
        <IconButton Icon={IoIosArrowBack} styleName="arrowbutton" onClick={getPrevMonth} />
        <div className={styles.title}>
          <span className={styles.month}>{`${timeparser.parseMonthIndex(
            selectedDate.getMonth(),
            'eng',
          )}`}</span>
          <span className={styles.year}>{`${selectedDate.getFullYear()}`}</span>
        </div>
        <IconButton Icon={IoIosArrowForward} styleName="arrowbutton" onClick={getNextMonth} />
      </div>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr className={styles.tableRow}>
            {daysShort.map((day) => (
              <th key={day} className={styles.tableHead}>
                {day[0]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {Object.values(calendarRows).map((cols) => {
            return (
              <tr key={cols[0].date} className={styles.tableRow}>
                {cols.map((col) => (
                  <td key={col.date} className={styles.tableCell}>
                    <Button
                      styleName={
                        col.class ||
                        (col.date === todayFormatted
                          ? 'calenderModal__today'
                          : 'calenderModal__date')
                      }
                      onClick={() => onSelect(col.date)}
                    >
                      {col.value}
                    </Button>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Modal>
  );
};

export default CalendarInputModal;
