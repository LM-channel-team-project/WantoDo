import React from 'react';
import ModalHeader from '../components/ModalHeader';
import Modal from './Modal';
import Button from '../components/Button';
import styles from '../styles/AlertModal.module.css';

const AlertModal = ({ title, message, cancelMsg, confirmMsg, onConfirm, closeModal }) => (
  <Modal styleName="alertModal" isBG>
    <ModalHeader styleName="alert" title={title} closeModal={closeModal} />
    <div className={styles.body}>
      <p className={styles.message}>{message}</p>
    </div>
    <div className={styles.buttons}>
      {cancelMsg && (
        <Button styleName="alertModal__cancel" onClick={closeModal}>
          {cancelMsg}
        </Button>
      )}
      {confirmMsg && (
        <Button
          stylesName="alertModal__confirm"
          onClick={() => {
            if (onConfirm instanceof Function) onConfirm();
            closeModal();
          }}
        >
          {confirmMsg}
        </Button>
      )}
    </div>
  </Modal>
);

export default AlertModal;
