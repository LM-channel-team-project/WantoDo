import React from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import useCalendar from './useCalendar';
import IconButton from './IconButton';

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
      <p>
        Selected Month: {`${monthNames[selectedDate.getMonth()]} - ${selectedDate.getFullYear()}`}
      </p>
      <table className="table">
        <thead>
          <tr>
            {daysShort.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
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

      <IconButton className="button" onClick={getPrevMonth} type="button">
        <IoIosArrowForward />
      </IconButton>
      <IconButton className="button" onClick={getNextMonth} type="button">
        <IoIosArrowBack />
      </IconButton>
    </div>
  );
};

export default Calendar;
