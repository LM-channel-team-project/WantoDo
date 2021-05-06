import React, { useRef } from 'react';
import { connect } from 'react-redux';
import timeparser from '../utils/timestamp-parser';
import { actionCreators } from '../store/store';
import Button from './Button';
import PeriodInputBox from './PeriodInputBox';
import PrioritySelector from './PrioritySelector';
import TagInputBox from './TagInputBox';
import styles from '../styles/TaskForm.module.css';
import Input from './Input';

const TaskForm = ({ content, tags, priority, periods, addTask, toggleTaskFormModal }) => {
  const contentRef = useRef();
  const priorityRef = useRef();
  const startRef = {
    year: useRef(),
    month: useRef(),
    date: useRef(),
    hours: useRef(),
    mins: useRef(),
    division: useRef(),
  };
  const endRef = {
    year: useRef(),
    month: useRef(),
    date: useRef(),
    hours: useRef(),
    mins: useRef(),
    division: useRef(),
  };

  const onTaskSubmit = (event) => {
    event.preventDefault();

    if (contentRef.current.value === '') {
      alert('할 일을 입력해주세요.');
      return;
    }

    const dateKeys = ['year', 'month', 'date', 'hours', 'mins', 'division'];
    const periodsValue = [startRef, endRef].map((ref) => {
      const dateObj = dateKeys.reduce((obj, key) => {
        const period = { ...obj };

        period[key] = ref[key].current.value;

        return period;
      }, {});

      return timeparser.toTimestamp(dateObj);
    }, []);

    const contentValue = contentRef.current.value;
    const priorityValue = priorityRef.current.value;

    const task = { content: contentValue, level: priorityValue, periods: periodsValue };

    addTask(task);
    // 백엔드로 테스크 데이터 전송
    toggleTaskFormModal();
  };

  const onCancelClick = () => {
    toggleTaskFormModal();
  };

  return (
    <form onSubmit={onTaskSubmit} className={styles.form}>
      <div className={styles.header}>
        <div className={styles.content}>
          <Input
            inputRef={contentRef}
            value={content}
            inputName="content"
            placeholder="오늘의 할 일을 적어주세요 (최대 50자)"
            maxLength="50"
          />
        </div>
        <div className={styles.buttons}>
          <Button styleName="taskForm__cancel" onClick={onCancelClick}>
            취소
          </Button>
          <Button type="submit" styleName="taskForm__done">
            완료
          </Button>
        </div>
      </div>
      <PrioritySelector inputRef={priorityRef} priority={priority} inputName="level" />
      <PeriodInputBox refs={{ startRef, endRef }} periods={periods || { start: Date.now() }} />
      <TagInputBox tags={tags} inputName="tags" />
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTask: (task) => dispatch(actionCreators.addTask(task)),
    toggleTaskFormModal: () => dispatch(actionCreators.toggleTaskFormModal()),
  };
};

export default connect(undefined, mapDispatchToProps)(TaskForm);
