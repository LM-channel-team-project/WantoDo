import React from 'react';
import { FaPlus } from 'react-icons/fa';
import PriorityIcon from 'components/Global/PriorityIcon';
import IconButton from 'components/Global/IconButton';
import styles from './styles.module.css';

/**
 * 클릭한 레벨 버튼에 따라 중요도 인풋을 받는 컴포넌트
 * @param {0 | 1 | 2 | 3} priority - 중요도를 나타내는 숫자
 * @param {string} inpuName - 폼에서 사용될 키 이름을 설정하는 문자열
 */
const PrioritySelector = ({ priority = 0, changePriority }) => (
  <div className={styles.selector}>
    <span className={styles.name}>중요도</span>
    <ul className={styles.list}>
      <li className={styles.item}>
        <IconButton styleName="priorityInput" onClick={() => changePriority(0)}>
          <FaPlus className={`${styles.close} ${priority > 0 && styles.lightOff}`} />
        </IconButton>
      </li>
      <li className={styles.item}>
        <IconButton styleName="priorityInput" onClick={() => changePriority(1)}>
          <PriorityIcon level="1" lightOff={priority < 1} />
        </IconButton>
      </li>
      <li className={styles.item}>
        <IconButton styleName="priorityInput" onClick={() => changePriority(2)}>
          <PriorityIcon level="2" lightOff={priority < 2} />
        </IconButton>
      </li>
      <li className={styles.item}>
        <IconButton styleName="priorityInput" onClick={() => changePriority(3)}>
          <PriorityIcon level="3" lightOff={priority < 3} />
        </IconButton>
      </li>
    </ul>
  </div>
);

export default PrioritySelector;
