import React from 'react';
import Modal from './Modal';
import TaskForm from '../components/TaskForm';

const TaskModal = ({ taskId, task, toggleModal }) => {
  const closeModal = () => {
    toggleModal();
  };

  return (
    <Modal styleName="taskModal">
      <TaskForm taskId={taskId} task={task} onCancel={closeModal} />
    </Modal>
  );
};

export default TaskModal;
