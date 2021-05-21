import { useState } from 'react';

// 표시알 요일 문자배열
const daysShortArr = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// 표시할 월일 문자배열
const monthNamesArr = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const useCalendar = (daysShort = daysShortArr, monthNames = monthNamesArr) => {
  const today = new Date();
  const todayFormatted = `${today.getFullYear()}-${
    today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1
  }-${today.getDate() < 10 ? `0${today.getDate()}` : today.getDate()}`;
  const daysInWeek = [1, 2, 3, 4, 5, 6, 0];
  const [selectedDate, setSelectedDate] = useState(today);
  const selectedMonthLastDate = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0,
  );
  const prevMonthLastDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0);
  const daysInMonth = selectedMonthLastDate.getDate();
  const firstDayInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
  const startingPoint = daysInWeek.indexOf(firstDayInMonth) + 1;
  let prevMonthStartingPoint =
    prevMonthLastDate.getDate() - daysInWeek.indexOf(firstDayInMonth) + 1;
  let currentMonthCounter = 1;
  let nextMonthCounter = 1;
  const rows = 5;
  const cols = 7;
  const calendarRows = {};

  for (let i = 1; i < rows + 1; i += 1) {
    for (let j = 1; j < cols + 1; j += 1) {
      if (!calendarRows[i]) {
        calendarRows[i] = [];
      }

      if (i === 1) {
        if (j < startingPoint) {
          calendarRows[i] = [
            ...calendarRows[i],
            {
              classes: 'in-prev-month',
              date: `${
                selectedDate.getMonth() === 0
                  ? selectedDate.getFullYear() - 1
                  : selectedDate.getFullYear()
              }-${
                selectedDate.getMonth() === 0
                  ? 12
                  : selectedDate.getMonth() < 10
                  ? `0${selectedDate.getMonth()}`
                  : selectedDate.getMonth()
              }-${
                prevMonthStartingPoint < 10 ? `0${prevMonthStartingPoint}` : prevMonthStartingPoint
              }`,
              value: prevMonthStartingPoint,
            },
          ];
          prevMonthStartingPoint += 1;
        } else {
          calendarRows[i] = [
            ...calendarRows[i],
            {
              classes: '',
              date: `${selectedDate.getFullYear()}-${
                selectedDate.getMonth() + 1 < 10
                  ? `0${selectedDate.getMonth() + 1}`
                  : selectedDate.getMonth() + 1
              }-${currentMonthCounter < 10 ? `0${currentMonthCounter}` : currentMonthCounter}`,
              value: currentMonthCounter,
            },
          ];
          currentMonthCounter += 1;
        }
      } else if (i > 1 && currentMonthCounter < daysInMonth + 1) {
        calendarRows[i] = [
          ...calendarRows[i],
          {
            classes: '',
            date: `${selectedDate.getFullYear()}-${
              selectedDate.getMonth() + 1 < 10
                ? `0${selectedDate.getMonth() + 1}`
                : selectedDate.getMonth() + 1
            }-${currentMonthCounter < 10 ? `0${currentMonthCounter}` : currentMonthCounter}`,
            value: currentMonthCounter,
          },
        ];
        currentMonthCounter += 1;
      } else {
        calendarRows[i] = [
          ...calendarRows[i],
          {
            classes: 'in-next-month',
            date: `${
              selectedDate.getMonth() + 2 === 13
                ? selectedDate.getFullYear() + 1
                : selectedDate.getFullYear()
            }-${
              selectedDate.getMonth() + 2 === 13
                ? 1
                : selectedDate.getMonth() + 2 < 10
                ? `0${selectedDate.getMonth() + 2}`
                : selectedDate.getMonth() + 2
            }-${nextMonthCounter < 10 ? `0${nextMonthCounter}` : nextMonthCounter}`,
            value: nextMonthCounter,
          },
        ];
        nextMonthCounter += 1;
      }
    }
  }
  const getPrevMonth = () => {
    setSelectedDate((prevValue) => new Date(prevValue.getFullYear(), prevValue.getMonth() - 1, 1));
  };
  const getNextMonth = () => {
    setSelectedDate((prevValue) => new Date(prevValue.getFullYear(), prevValue.getMonth() + 1, 1));
  };
  return {
    daysShort,
    monthNames,
    todayFormatted,
    calendarRows,
    selectedDate,
    getPrevMonth,
    getNextMonth,
  };
};

export default useCalendar;
