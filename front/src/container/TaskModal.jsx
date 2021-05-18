import React, { useState } from 'react';
import Modal from './Modal';
import TaskForm from '../components/TaskForm';

const TaskModal = ({ taskId, task }) => {
  const [display, setDisplay] = useState(true);

  const closeModal = () => {
    setDisplay(false);
  };

  return (
    display && (
      <Modal styleName="taskModal">
        <TaskForm taskId={taskId} task={task} onCancel={closeModal} />
      </Modal>
    )
  );
};

export default TaskModal;
