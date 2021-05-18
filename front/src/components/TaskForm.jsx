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

const TaskForm = ({ addTask, updateTask, toggleTaskFormModal, token, taskId, task, tagList }) => {
  const [tags, setTags] = useState(task.tags || []);
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

  const onTaskSubmit = async (event) => {
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

    const collected = {
      content: contentRef.current.value,
      level: Number(priorityRef.current.value),
      periods,
      tags,
    };

    // taskId가 없으면 등록, 있으면 수정
    if (taskId) {
      updateTask(taskId, collected);
      accountManager.updateTask(token, taskId, collected);
    } else {
      const id = await accountManager.addTask(token, collected);
      addTask(id, collected);
    }

    toggleTaskFormModal();
  };

  const onCancelClick = () => {
    toggleTaskFormModal();
  };

  const currentTime = Date.now();
  return (
    <form onSubmit={onTaskSubmit} className={styles.form}>
      <div className={styles.header}>
        <div className={styles.content}>
          <Input
            className={styles.contentInput}
            inputRef={contentRef}
            value={task.content}
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
      <PrioritySelector inputRef={priorityRef} priority={task.level} inputName="level" />
      <PeriodInputBox
        refs={{ startRef, endRef }}
        periods={task.periods || { start: currentTime, end: currentTime }}
      />
      <TagInputBox tagList={tagList} token={token} tags={tags} inputName="tags" setTags={setTags} />
    </form>
  );
};

const mapStateToProps = ({ token, tags }) => {
  return { token, tagList: tags };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTask: (task) => dispatch(actionCreators.addTask(task)),
    updateTask: (taskId, task) => dispatch(actionCreators.updateTask(taskId, task)),
    toggleTaskFormModal: () => dispatch(actionCreators.toggleTaskFormModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
