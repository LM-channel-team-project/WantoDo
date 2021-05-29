import React from 'react';
import colorManager from '../utils/color-manager';
import Modal from './Modal';
import Button from '../components/Button';
import tagColors from '../styles/Tag.module.css';
import styles from '../styles/AutoCompleteBox.module.css';

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
