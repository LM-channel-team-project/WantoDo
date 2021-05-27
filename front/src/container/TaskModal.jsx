import React from 'react';
import Modal from './Modal';
import TaskForm from '../components/TaskForm';

const TaskModal = ({ taskId, task, closeModal, setAlert }) => {
  return (
    <Modal styleName="taskModal" isBG onBGClick={closeModal}>
      <TaskForm taskId={taskId} task={task} onCancel={closeModal} setAlert={setAlert} />
    </Modal>
  );
};

export default TaskModal;
