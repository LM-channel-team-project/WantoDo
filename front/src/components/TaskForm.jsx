import React from 'react';
import Button from './Button';
import PeriodInputBox from './PeriodInputBox';
import PrioritySelector from './PrioritySelector';
import TagInputBox from './TagInputBox';
import styles from '../styles/TaskForm.module.css';
import Input from './Input';

const TaskForm = ({ content, tags, priority, periods, onCancel }) => {
  const onTaskSubmit = (event) => {
    event.preventDefault();

    const form = new FormData(event.target);

    const data = Array.from(form.keys()).reduce((obj, key) => {
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

    console.log(data);
    // 테스크 상태 업데이트

    // 백엔드로 테스크 데이터 전송
  };

  return (
    <form onSubmit={onTaskSubmit} className={styles.form}>
      <div className={styles.header}>
        <Input
          value={content}
          inputName="content"
          placeholder="오늘의 할 일을 적어주세요 (최대 50자)"
          maxLength="50"
        />
        <div className={styles.buttons}>
          <Button styleName="taskForm__cancel" onClick={onCancel}>
            취소
          </Button>
          <Button type="submit" styleName="taskForm__done">
            완료
          </Button>
        </div>
      </div>
      <PrioritySelector priority={priority} inputName="priority" />
      <PeriodInputBox periods={periods} />
      <TagInputBox tags={tags} inputName="tags" />
    </form>
  );
};

export default TaskForm;
