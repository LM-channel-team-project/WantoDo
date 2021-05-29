import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from 'components/Global/Button';
import Input from 'components/Global/Input';
import PrioritySelector from 'components/Main/TaskModal/PrioritySelector';
import PeriodInputBox from 'components/Main/TaskModal/PeriodInputBox';
import TagInputBox from 'components/Main/TaskModal/TagInputBox';
import accountManager from 'utils/account-manager';
import timeparser from 'utils/timestamp-parser';
import useInput from 'hooks/useInput';
import { actionCreators } from 'store/store';
import styles from './styles.module.css';

const setTimeBySecs = (time) => timeparser.getTimestampBySecs(time);

const currentTime = setTimeBySecs(Date.now());

// 태그 객체로 이루어진 두 배열 비교하여 개수 반환
const getDiffCountOfTags = (arr1, arr2) => {
  const longer = Math.max(arr1.length, arr2.length);

  let count = 0;
  for (let i = 0; i < longer; i += 1) {
    let tag1 = arr1[i];
    let tag2 = arr2[i];
    if (!tag1) tag1 = {};
    if (!tag2) tag2 = {};

    if (tag1.tagId !== tag2.tagId) count += 1;
  }

  return count;
};

const TaskForm = ({
  addTask,
  updateTask,
  closeTaskModal,
  token,
  taskId,
  task,
  tagList,
  onCancel,
  setAlert,
  setEdited,
}) => {
  const intialStart = task.periods ? setTimeBySecs(task.periods.start) : currentTime;
  const initialEnd = task.periods ? setTimeBySecs(task.periods.end) : currentTime;
  const initialLevel = Number(task.level) || 0;
  const initialTags = task.tags || [];

  // 입력 값 상태 관리
  const { value: content, onChange: changeContent } = useInput(task.content);
  const [start, setStart] = useState(intialStart);
  const [end, setEnd] = useState(initialEnd);
  const [tags, setTags] = useState(initialTags);
  const [level, setLevel] = useState(initialLevel);

  const onTaskSubmit = async (event) => {
    event.preventDefault();

    if (content === '') {
      // 내용 입력 없으면 경고창 표시
      setAlert({ display: true, message: '내용을 입력 해주세요', confirm: '확인' });
      return;
    }

    const updatedTask = {
      content,
      level,
      periods: { start, end },
      tags,
    };

    if (taskId) {
      // taskId가 있으면 수정
      updateTask(taskId, updatedTask);
      accountManager.updateTask(token, taskId, updatedTask);
    } else {
      // taskId가 없으면 서버에 등록 후 상태 업데이트
      const id = await accountManager.addTask(token, updatedTask);
      addTask(id, updatedTask);
    }

    closeTaskModal();
  };

  // 초기 상태와 비교하여 수정 상태 변경
  const changeEdited = (initial, current) => {
    if (initial === current) setEdited(false);
    else setEdited(true);
  };

  return (
    <form onSubmit={onTaskSubmit} className={styles.form}>
      <div className={styles.header}>
        <div className={styles.content}>
          <Input
            className={styles.contentInput}
            value={content}
            onChange={(event) => {
              changeEdited(event.target.value, task.content);
              changeContent(event);
            }}
            placeholder="오늘의 할 일을 적어주세요 (최대 50자)"
            maxLength="50"
          />
        </div>
        <div className={styles.buttons}>
          <Button styleName="taskForm__cancel" onClick={onCancel}>
            취소
          </Button>
          <Button type="submit" styleName="taskForm__done">
            완료
          </Button>
        </div>
      </div>
      <PrioritySelector
        priority={level}
        changePriority={(updated) => {
          changeEdited(initialLevel, updated);
          setLevel(updated);
        }}
      />
      <PeriodInputBox
        periods={{ start, end }}
        changePeriods={{
          start: (changeTime) => {
            setStart((prev) => {
              const time = changeTime(prev);
              changeEdited(intialStart, time);
              return time;
            });
          },
          end: (changeTime) => {
            setEnd((prev) => {
              const time = changeTime(prev);
              changeEdited(initialEnd, time);
              return time;
            });
          },
        }}
        setAlert={setAlert}
      />
      <TagInputBox
        tagList={tagList}
        token={token}
        tags={tags}
        setTags={(changeTags) => {
          setTags((prev) => {
            let updated;
            if (changeTags instanceof Function) {
              updated = changeTags(prev);
            } else {
              updated = changeTags;
            }

            const diffCount = getDiffCountOfTags(initialTags, updated);
            changeEdited(0, diffCount); // 처음 태그 정보와 차이 없는지 확인하여 수정 상태 변경

            return updated;
          });
        }}
        setAlert={setAlert}
      />
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
    closeTaskModal: () => dispatch(actionCreators.toggleTaskFormModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
