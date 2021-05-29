import React from 'react';
import Modal from 'components/Layout/Modal';
import Button from 'components/Global/Button';
import tagColors from 'components/Global/Tag/styles.module.css';
import colorManager from 'utils/color-manager';
import styles from './styles.module.css';

const AutoCompleteBox = ({ list = [], onItemClick }) => {
  return (
    <Modal styleName="autoCompleteBox">
      <ul className={styles.list}>
        {Object.values(list).map((tag) => {
          const { tagId, name, color } = tag;
          return (
            <li key={tagId} className={styles.item}>
              <Button styleName="autoCompleteBox" onClick={() => onItemClick(tag)}>
                <div className={`${styles.color} ${tagColors[colorManager.toName(color)]}`} />
                <span className={styles.name}>{name}</span>
              </Button>
            </li>
          );
        })}
      </ul>
    </Modal>
  );
};

export default AutoCompleteBox;
