import React, { useState } from 'react';
import { connect } from 'react-redux';
import CategoryDivider from '../components/CategoryDivider';
import DailyNavbar from '../components/DailyNavbar';
import TaskList from '../components/TaskList';
import ToggleSwitch from '../components/ToggleSwitch';
import timeparser from '../utils/timestamp-parser';
import styles from '../styles/DailyContainer.module.css';

function categorizeTasks(tasks) {
  const categorized = Object.keys(tasks).reduce((obj, taskId) => {
    const copied = { ...obj };

    const { tags } = tasks[taskId];

    if (tags) {
      tags.forEach(({ tagId }) => {
        if (copied[tagId]) copied[tagId][taskId] = tasks[taskId];
        else copied[tagId] = { [taskId]: tasks[taskId] };
      });
    }

    return copied;
  }, {});

  return categorized;
}

function filterByDate(tasks, date) {
  const timestamp = timeparser.parseDate(date, { separator: '' });

  const filtered = Object.keys(tasks).reduce((obj, taskId) => {
    const copied = { ...obj };

    const task = tasks[taskId];
    const start = timeparser.parseDate(task.periods.start, { separator: '' });
    const end = timeparser.parseDate(task.periods.end, { separator: '' });

    if (timestamp >= start && timestamp <= end) {
      copied[taskId] = task;
    }

    return copied;
  }, {});
  return filtered;
}

const DailyContainer = ({ date, tasks, tags }) => {
  const [mode, setMode] = useState('time');
  const [current, setCurrent] = useState(date ? new Date(date) : new Date());

  const parsedDate = {
    month: timeparser.parseMonthIndex(current.getMonth(), 'eng'),
    date: current.getDate(),
    day: timeparser.parseDayIndex(current.getDay(), 'eng'),
  };

  const renderTaskLists = () => {
    const filteredByDay = filterByDate(tasks, current);
    const categorized = categorizeTasks(filteredByDay);

    const renderCategorized = Object.keys(categorized).map((tagId) => (
      <li key={tagId} className={styles.divider}>
        <CategoryDivider styleName="taskContainer">
          <span className={styles.dividerContent}>{tags[tagId].name}</span>
        </CategoryDivider>
        <TaskList tasks={categorized[tagId]} type="daily" />
      </li>
    ));

    const renderFiltered = <TaskList tasks={filteredByDay} type="daily" />;

    return mode === 'time' ? renderFiltered : renderCategorized;
  };

  return (
    <section className={styles.container}>
      <DailyNavbar current={current} move={setCurrent} />
      <header className={styles.header}>
        <h1 className={styles.title}>
          <span className={styles.date}>{parsedDate.date}</span>
          <div className={styles.monthAndDay}>
            <span className={styles.month}>{parsedDate.month}</span>
            <span className={styles.day}>{parsedDate.day}</span>
          </div>
        </h1>
        <ToggleSwitch
          name="mode"
          switchOn={mode === 'tag'}
          onClick={() => setMode(mode === 'time' ? 'tag' : 'time')}
        />
      </header>
      <ul className={styles.list}>{renderTaskLists()}</ul>
    </section>
  );
};

const mapStateToProps = ({ tasks, tags }) => {
  return { tasks, tags };
};

export default connect(mapStateToProps)(DailyContainer);
