import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import IconButton from 'components/Global/IconButton';
import styles from './styles.module.css';

const ModalHeader = ({ title, closeModal, styleName }) => (
  <header className={styles.header}>
    <h2 className={`${styles.title} ${styles[styleName]}`}>{title}</h2>
    <hr className={styles.line} />
    <div className={styles.close}>
      <IconButton Icon={AiOutlineClose} styleName="close" onClick={closeModal} />
    </div>
  </header>
);

export default ModalHeader;
