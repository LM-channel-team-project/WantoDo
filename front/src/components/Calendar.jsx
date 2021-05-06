import React from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import useCalendar from './useCalendar';
import IconButton from './IconButton';
import styles from '../styles/Calendar.module.css';

const Calendar = () => {
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
  } = useCalendar();

  const dateClickHandler = (date) => {
    console.log(date);
  };

  return (
    <div>
      <div className={styles.monthyear}>
        <span className={styles.month}>{`${monthNames[selectedDate.getMonth()]}`}</span>
        <span className={styles.year}>{`${selectedDate.getFullYear()}`}</span>
      </div>
      <div className={styles.content}>
        <IconButton className="button" styleName="arrowbutton" onClick={getPrevMonth} type="button">
          <IoIosArrowBack />
        </IconButton>
        <table className={styles.table}>
          <thead>
            <tr className={styles.dayofweek}>
              {daysShort.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody className={styles.date}>
            {Object.values(calendarRows).map((cols) => {
              return (
                <tr key={cols[0].date}>
                  {cols.map((col) =>
                    col.date === todayFormatted ? (
                      <td>
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
                      <td>
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

        <IconButton className="button" styleName="arrowbutton" onClick={getNextMonth} type="button">
          <IoIosArrowForward />
        </IconButton>
      </div>
    </div>
  );
};

export default Calendar;
