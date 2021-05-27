import React from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store/store';
import Modal from './Modal';
import QuickAddForm from '../components/QuickAddForm';
import accountManager from '../utils/account-manager';

const QuickModal = ({ token, closeModal, openDetailModal, addTask }) => {
  const onSubmit = async (content) => {
    const currentTime = Date.now();
    const task = {
      content,
      periods: { start: currentTime, end: currentTime },
    };

    const taskId = await accountManager.addTask(token, task);
    addTask(taskId, task);
  };

  return (
    <Modal styleName="quickModal" isBG onBGClick={closeModal}>
      <QuickAddForm
        placeholder="나의 할 일 작성하기"
        isDetailButton
        openDetailModal={(task) => {
          closeModal();
          openDetailModal(task);
        }}
        onSubmit={onSubmit}
      />
    </Modal>
  );
};

const mapStateToProps = ({ tasks, token }) => {
  return { tasks, token };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTasks: (tasks) => dispatch(actionCreators.updateTasks(tasks)),
    getTags: (tags) => dispatch(actionCreators.getTags(tags)),
    addTask: (taskId, task) => dispatch(actionCreators.addTask(taskId, task)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuickModal);
