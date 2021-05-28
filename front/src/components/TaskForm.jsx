import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store/store';
import Button from './Button';
import Input from './Input';
import PrioritySelector from './PrioritySelector';
import PeriodInputBox from './PeriodInputBox';
import TagInputBox from './TagInputBox';
import accountManager from '../utils/account-manager';
import timeparser from '../utils/timestamp-parser';
import useInput from '../hooks/useInput';
import styles from '../styles/TaskForm.module.css';

const setTimeBySecs = (time) => timeparser.getTimestampBySecs(time);

const TaskForm = ({
  addTask,
  updateTask,
  toggleTaskFormModal,
  token,
  taskId,
  task,
  tagList,
  setAlert,
}) => {
  const [tags, setTags] = useState(task.tags || []);
  const contentInput = useInput(task.content);
  const priorityRef = useRef();

  const currentTime = setTimeBySecs(Date.now());
  const startTime = task.periods ? setTimeBySecs(task.periods.start) : currentTime;
  const endTime = task.periods ? setTimeBySecs(task.periods.end) : currentTime;

  const [start, setStart] = useState(startTime);
  const [end, setEnd] = useState(endTime);

  const onTaskSubmit = async (event) => {
    event.preventDefault();

    if (contentInput.value === '') {
      // 경고창 표시
      setAlert({ display: true, message: '내용을 입력 해주세요', confirm: '확인' });
      return;
    }

    const collected = {
      content: contentInput.value,
      level: Number(priorityRef.current.value),
      periods: { start, end },
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

  return (
    <form onSubmit={onTaskSubmit} className={styles.form}>
      <div className={styles.header}>
        <div className={styles.content}>
          <Input
            className={styles.contentInput}
            value={contentInput.value}
            onChange={contentInput.onChange}
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
        periods={{ start, end }}
        changePeriods={{ start: setStart, end: setEnd }}
        setAlert={setAlert}
      />
      <TagInputBox tagList={tagList} token={token} tags={tags} setTags={setTags} />
    </form>
  );
};

const mapStateToProps = ({ token, tags }) => {
  return { token, tagList: tags };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTask: (taskId, task) => dispatch(actionCreators.addTask(taskId, task)),
    updateTask: (taskId, task) => dispatch(actionCreators.updateTask(taskId, task)),
    toggleTaskFormModal: () => dispatch(actionCreators.toggleTaskFormModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
