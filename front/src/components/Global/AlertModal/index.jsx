import React from 'react';
import ModalHeader from 'components/Layout/Modal/ModalHeader';
import Modal from 'components/Layout/Modal';
import Button from 'components/Global/Button';
import styles from './styles.module.css';

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
