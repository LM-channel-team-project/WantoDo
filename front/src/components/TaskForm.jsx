import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store/store';
import Button from './Button';
import PeriodInputBox from './PeriodInputBox';
import PrioritySelector from './PrioritySelector';
import TagInputBox from './TagInputBox';
import styles from '../styles/TaskForm.module.css';
import Input from './Input';

const TaskForm = ({ content, tags, priority, periods, addTask, toggleTaskFormModal }) => {
  const inputRef = useRef();

  const onTaskSubmit = (event) => {
    event.preventDefault();

    if (inputRef.current.value === '') {
      alert('할 일을 입력해주세요.');
      return;
    }

    const form = new FormData(event.target);

    const task = Array.from(form.keys()).reduce((obj, key) => {
      const copied = { ...obj };

      if (key.includes('date')) {
        // date 인풋 데이터 처리
        if (!copied.date) copied.date = [];

        const startOrEnd = key.includes('start') ? 0 : 1;

        const value = form.get(key);
        copied.date[startOrEnd] = value ? Date.parse(value) : '';
      } else {
        copied[key] = form.get(key);
      }

      return copied;
    }, {});

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
        <Input
          inputRef={inputRef}
          value={content}
          name="content"
          placeholder="오늘의 할 일을 적어주세요 (최대 50자)"
          maxLength="50"
        />
        <div className={styles.buttons}>
          <Button styleName="taskForm__cancel" onClick={onCancelClick}>
            취소
          </Button>
          <Button type="submit" styleName="taskForm__done">
            완료
          </Button>
        </div>
      </div>
      <PrioritySelector priority={priority} inputName="level" />
      <PeriodInputBox periods={periods} />
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
