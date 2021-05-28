import React, { useState } from 'react';
import Modal from './Modal';
import TaskForm from '../components/TaskForm';

const TaskModal = ({ taskId, task, closeModal, setAlert }) => {
  const [edited, setEdited] = useState(false);

  const alertOption = {
    display: true,
    message: '작성 내용을 버리고 창을 닫으시겠습니까?',
    cancel: '아니오',
    confirm: '예',
    onConfirm: () => closeModal(),
  };

  const onClose = () => {
    // 태스크 수정 여부에 따라 모달 닫을 때 경고창 표시할지 결정
    if (!edited) closeModal();
    else setAlert(alertOption);
  };

  return (
    <Modal styleName="taskModal" isBG onBGClick={onClose}>
      <TaskForm
        taskId={taskId}
        task={task}
        onCancel={onClose}
        setAlert={setAlert}
        setEdited={setEdited}
      />
    </Modal>
  );
};

export default TaskModal;
