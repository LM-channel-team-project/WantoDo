import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Modal from './Modal';
import ProfileButton from '../components/ProfileButton';
import IconButton from '../components/IconButton';
import generateId from '../utils/id-generator';
import styles from '../styles/ImageModal.module.css';

const ImageModal = ({ imageList = [], onSelect, closeModal }) => {
  const onImageClick = (e) => {
    onSelect(e);
  };

  return (
    <Modal styleName="imageModal">
      <ul className={styles.list}>
        {imageList.map((url) => (
          <li key={generateId()} className={styles.item}>
            <ProfileButton imageURL={url} styleName="imageModal" onClick={onImageClick} />
          </li>
        ))}
      </ul>
      <div className={styles.buttonWrapper}>
        <IconButton Icon={AiOutlineClose} styleName="close" onClick={closeModal} />
      </div>
    </Modal>
  );
};

export default ImageModal;
