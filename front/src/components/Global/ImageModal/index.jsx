import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Modal from 'components/Layout/Modal';
import ProfileButton from 'components/Main/Navbar/ProfileButton';
import IconButton from 'components/Global/IconButton';
import generateId from 'utils/id-generator';
import styles from './styles.module.css';

const ImageModal = ({ imageList = [], onSelect, closeModal, styleName }) => {
  const onImageClick = (e) => {
    const target = e.target.tagName === 'BUTTON' ? e.target.firstChild : e.target;
    const { origin } = target.dataset;

    onSelect(origin);
  };

  return (
    <Modal styleName={`imageModal${styleName ? `_${styleName}` : ''}`}>
      <ul className={`${styles.list} ${styles[styleName]}`}>
        {imageList.map((url) => (
          <li key={generateId()} className={`${styles.item} ${styles[styleName]}`}>
            <ProfileButton imageURL={url} styleName="imageModal" onClick={onImageClick} />
          </li>
        ))}
      </ul>
      <div className={`${styles.buttonWrapper} ${styles[styleName]}`}>
        <IconButton Icon={AiOutlineClose} styleName="close" onClick={closeModal} />
      </div>
    </Modal>
  );
};

export default ImageModal;
