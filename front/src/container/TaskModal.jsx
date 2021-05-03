import React, { useState } from 'react';
import Modal from './Modal';
import TaskForm from '../components/TaskForm';

const TaskModal = ({ content }) => {
  const [display, setDisplay] = useState(true);

  const closeModal = () => {
    setDisplay(false);
  };

  return (
    display && (
      <Modal styleName="taskModal">
        <TaskForm content={content} onCancel={closeModal} />
      </Modal>
    )
  );
};

export default TaskModal;
