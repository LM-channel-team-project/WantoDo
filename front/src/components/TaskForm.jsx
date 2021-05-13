import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import timeparser from '../utils/timestamp-parser';
import { actionCreators } from '../store/store';
import Button from './Button';
import PeriodInputBox from './PeriodInputBox';
import PrioritySelector from './PrioritySelector';
import TagInputBox from './TagInputBox';
import styles from '../styles/TaskForm.module.css';
import Input from './Input';
import accountManager from '../utils/account-manager';

const TaskForm = ({ addTask, toggleTaskFormModal, token, ...props }) => {
  const [tags, setTags] = useState(props.tags || []);
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
      // 경고창 표시
      return;
    }

    // periods 객체 만듦
    const dateKeys = ['year', 'month', 'date', 'hours', 'mins', 'division'];
    const refs = { start: startRef, end: endRef };
    const periods = Object.keys(refs).reduce((result, key) => {
      const copied = { ...result };
      // 입력값을 모아 timestamp로 바꾸기 위한 객체 만듦
      const dateObj = dateKeys.reduce((obj, unit) => {
        const period = { ...obj };

        period[unit] = refs[key][unit].current.value;

        return period;
      }, {});

      copied[key] = timeparser.toTimestamp(dateObj);
      return copied;
    }, {});

    const task = {
      content: contentRef.current.value,
      level: Number(priorityRef.current.value),
      periods,
      tags: tags.length > 0 ? tags : null,
    };

    addTask(task);
    // 백엔드로 테스크 데이터 전송
    accountManager.addTask(token, task);
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
            className={styles.contentInput}
            inputRef={contentRef}
            value={props.content}
            name="content"
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
      <PrioritySelector inputRef={priorityRef} priority={props.priority} inputName="level" />
      <PeriodInputBox
        refs={{ startRef, endRef }}
        periods={props.periods || { start: Date.now(), end: Date.now() + 3600000 }}
      />
      <TagInputBox tags={tags} inputName="tags" setTags={setTags} />
    </form>
  );
};

const mapStateToProps = ({ token }) => {
  return { token };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTask: (task) => dispatch(actionCreators.addTask(task)),
    toggleTaskFormModal: () => dispatch(actionCreators.toggleTaskFormModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
