import React from 'react';
import { GrPrevious, GrNext } from 'react-icons/gr';
import Button from 'components/Global/Button';
import IconButton from 'components/Global/IconButton';
import timeparser from 'utils/timestamp-parser';
import styles from './styles.module.css';

const DailyNavbar = ({ current, move }) => {
  const startpoint = new Date(current.getFullYear(), current.getMonth(), current.getDate() - 2);
  const dates = Array(5)
    .fill(startpoint)
    .map((date, i) => {
      const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + i);

      return {
        obj: newDate,
        month: newDate.getMonth() + 1,
        date: newDate.getDate(),
        day: timeparser.parseDayIndex(newDate.getDay(), 'eng'),
        class: i === 2 ? 'dailyNavbar__date--today' : 'dailyNavbar__date',
      };
    });

  const changePage = (direction) => {
    const n = direction === 'prev' ? -5 : 5;
    move(new Date(current.getFullYear(), current.getMonth(), current.getDate() + n));
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.button}>
        <IconButton
          Icon={GrPrevious}
          styleName="dailyNavbar__arrow"
          onClick={() => changePage('prev')}
        />
      </div>
      <ol className={styles.days}>
        {dates.map((date) => (
          <li key={date.date}>
            <Button styleName={date.class} onClick={() => move(date.obj)}>
              <span className={styles.date}>
                {date.month}/{date.date}
              </span>
              <span className={styles.day}>{date.day}</span>
            </Button>
          </li>
        ))}
      </ol>
      <div className={styles.button}>
        <IconButton
          styleName="dailyNavbar__arrow"
          Icon={GrNext}
          onClick={() => changePage('next')}
        />
      </div>
    </nav>
  );
};

export default DailyNavbar;
