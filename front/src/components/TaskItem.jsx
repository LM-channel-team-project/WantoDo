import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { connect } from 'react-redux';
import { actionCreators } from '../store/store';
import CheckButton from './CheckButton';
import IconButton from './IconButton';
import PriorityIcon from './PriorityIcon';
import Button from './Button';
import Tag from './Tag';
import timeparser from '../utils/timestamp-parser';
import accountManager from '../utils/account-manager';
import styles from '../styles/TaskItem.module.css';

/** Created by 오영롱(youngrongoh) on 2021/04/20
 * 전단받은 사용자의 태스크 정보를 투두 형식으로 보여주는 아이템
 * @param {Object} props.task -
 * @param {'basic' | 'daily'} props.type - 태스크 아이템에서 기간(period)에 대한 표시 여부를 결정하는 문자열
 */

const TaskItem = ({ token, taskId, task, type, updateTask, deleteTask, toggleTaskFormModal }) => {
  const { level, checked, content, periods, tags } = task;
  const isPeriodsRender = periods && type === 'daily';
  const isTagsRender = tags && type === 'daily';

  const onCheckClick = (_, _checked) => {
    const updated = { ...task };
    updated.checked = _checked;
    updateTask(taskId, updated);
    accountManager.updateTask(token, taskId, updated);
  };

  const onDeleteClick = () => {
    deleteTask(taskId);
    accountManager.deleteTask(token, taskId);
  };

  const onTaskClick = () => {
    toggleTaskFormModal(taskId, task);
  };

  const renderTags = () => (
    <ul className={styles.tags}>
      {tags.map((tag) => (
        <li key={tag.tagId} className={styles.tag}>
          <Tag name={tag.name} color={tag.color} />
        </li>
      ))}
    </ul>
  );

  return (
    <li className={styles.task}>
      <div className={styles.elements}>
        <div className={styles.checkcontent}>
          <CheckButton checked={checked} onClick={onCheckClick} />
          <Button styleName="taskItem" onClick={onTaskClick}>
            <p className={`${styles.content} ${checked && styles.checked}`}>{content}</p>
          </Button>
        </div>
        {isTagsRender && renderTags()}
        <div className={styles.iconbuttons}>
          <PriorityIcon level={level} />
          <IconButton Icon={AiFillDelete} styleName="todoDeleteButton" onClick={onDeleteClick} />
        </div>
      </div>
      {isPeriodsRender && <span className={styles.period}>{timeparser.parsePeriods(periods)}</span>}
    </li>
  );
};

const mapStateToProps = ({ token }) => {
  return { token };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTask: (taskId, task) => dispatch(actionCreators.updateTask(taskId, task)),
    deleteTask: (id) => dispatch(actionCreators.deleteTask(id)),
    toggleTaskFormModal: (taskId, task) =>
      dispatch(actionCreators.toggleTaskFormModal(taskId, task)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
