import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import PriorityIcon from './PriorityIcon';
import IconButton from './IconButton';
import styles from '../styles/PrioritySelector.module.css';

/**
 * 클릭한 레벨 버튼에 따라 중요도 인풋을 받는 컴포넌트
 * @param {0 | 1 | 2 | 3} priority - 중요도를 나타내는 숫자
 * @param {string} inpuName - 폼에서 사용될 키 이름을 설정하는 문자열
 */
const PrioritySelector = ({ priority, inputName }) => {
  const [value, setValue] = useState(Number(priority) || 0);
  const onButtonClick = (level) => {
    setValue(level);
  };

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <label className={styles.selector} htmlFor={styles.selector}>
      <span className={styles.name}>중요도</span>
      {}
      <ul className={styles.list}>
        <li className={styles.item}>
          <IconButton styleName="priorityInput" onClick={() => onButtonClick(0)}>
            <AiOutlineClose className={`${styles.close} ${value > 0 && styles.lightOff}`} />
          </IconButton>
        </li>
        <li className={styles.item}>
          <IconButton styleName="priorityInput" onClick={() => onButtonClick(1)}>
            <PriorityIcon level="1" lightOff={value < 1} />
          </IconButton>
        </li>
        <li className={styles.item}>
          <IconButton styleName="priorityInput" onClick={() => onButtonClick(2)}>
            <PriorityIcon level="2" lightOff={value < 2} />
          </IconButton>
        </li>
        <li className={styles.item}>
          <IconButton styleName="priorityInput" onClick={() => onButtonClick(3)}>
            <PriorityIcon level="3" lightOff={value < 3} />
          </IconButton>
        </li>
      </ul>
      <select
        className={styles.select}
        name={inputName}
        id={styles.selector}
        value={value}
        onChange={onChange}
      >
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
    </label>
  );
};

export default PrioritySelector;
