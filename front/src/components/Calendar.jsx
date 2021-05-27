import React from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import useCalendar from './useCalendar';
import IconButton from './IconButton';
import styles from '../styles/Calendar.module.css';

const Calendar = ({ isMonStart }) => {
  const testStyle = {
    border: 0,
    outline: 0,
  };
  const {
    calendarRows,
    selectedDate,
    todayFormatted,
    daysShort,
    monthNames,
    getNextMonth,
    getPrevMonth,
  } = useCalendar(isMonStart);

  const dateClickHandler = (date) => {
    // 날짜에 해당하는 태스크 리스트로 스크롤 이동
    const scrollTarget = document.querySelector(`[data-date="${date}"]`);
    if (scrollTarget) scrollTarget.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <div className={styles.title}>
          <span className={styles.month}>{`${monthNames[selectedDate.getMonth()]}`}</span>
          <span className={styles.year}>{`${selectedDate.getFullYear()}`}</span>
        </div>
      </div>
      <div className={styles.content}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr className={styles.tableRow}>
              {daysShort.map((day) => (
                <th key={day} className={styles.tableHeadCell}>
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {Object.values(calendarRows).map((cols) => {
              return (
                <tr key={cols[0].date} className={styles.tableRow}>
                  {cols.map((col) =>
                    col.date === todayFormatted ? (
                      <td className={styles.tableCell}>
                        <IconButton
                          style={testStyle}
                          type="button"
                          pkey={col.date}
                          className={`${col.classes} today`}
                          styleName="today"
                          onClick={() => dateClickHandler(col.date)}
                        >
                          {col.value}
                        </IconButton>
                      </td>
                    ) : (
                      <td className={styles.tableCell}>
                        <IconButton
                          style={testStyle}
                          type="button"
                          key={col.date}
                          className={col.classes}
                          styleName="date"
                          onClick={() => dateClickHandler(col.date)}
                        >
                          {col.value}
                        </IconButton>
                      </td>
                    ),
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={styles.buttons}>
          <IconButton
            className="button"
            styleName="arrowbutton"
            onClick={getPrevMonth}
            type="button"
          >
            <IoIosArrowBack />
          </IconButton>
          <IconButton
            className="button"
            styleName="arrowbutton"
            onClick={getNextMonth}
            type="button"
          >
            <IoIosArrowForward />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
