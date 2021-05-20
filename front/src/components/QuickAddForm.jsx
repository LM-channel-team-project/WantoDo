import React, { useRef } from 'react';
import { FaPlus } from 'react-icons/fa';
import { connect } from 'react-redux';
import { actionCreators } from '../store/store';
import Button from './Button';
import IconButton from './IconButton';
import Input from './Input';
import styles from '../styles/QuickAddForm.module.css';
import accountManager from '../utils/account-manager';

/**
 * Task 내용만 입력하여 Task를 빠르게 추가하는 폼 컴포넌트
 * @param {Fucntion} toggleTaskFormModal - 전역 모달 상태를 변경하여 태스크 폼을 토글하는 함수
 */

const QuickAddForm = ({ token, toggleTaskFormModal, addTask }) => {
  const inputRef = useRef();

  const onSubmit = async (event) => {
    event.preventDefault();

    if (inputRef.current.value === '') return;

    const currentTime = Date.now();
    const task = {
      content: inputRef.current.value,
      periods: { start: currentTime, end: currentTime },
    };
    const taskId = await accountManager.addTask(token, task);

    addTask(taskId, task);
    inputRef.current.value = '';
  };

  const onDetailClick = () => {
    // QuickAddForm 입력을 TaskModal로 전달하고 초기화
    const task = { content: inputRef.current.value };
    toggleTaskFormModal('', task);
    inputRef.current.value = '';
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <IconButton Icon={FaPlus} styleName="QuickAddForm__icon" onClick={onDetailClick} />
      <Input
        inputRef={inputRef}
        name="content"
        styleName="QuickAddForm"
        placeholder="나의 할 일 작성하기"
      />
      <Button styleName="QuickAddForm" type="submit">
        등록
      </Button>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTaskFormModal: (taskId, task) =>
      dispatch(actionCreators.toggleTaskFormModal(taskId, task)),
    addTask: (taskId, task) => dispatch(actionCreators.addTask(taskId, task)),
  };
};

export default connect(undefined, mapDispatchToProps)(QuickAddForm);
