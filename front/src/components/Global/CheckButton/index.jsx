import React from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import Button from 'components/Global/Button';
import styles from './styles.module.css';

/**
 * 외부에서 checked 상태를 받아와 업데이트 할 수 있는 체크 버튼
 * @param {boolean} props.checked - 외부에서 값을 받아와 체크 상태의 초기값으로 설정되는 문자열
 * @param {Function} props.onClick - 클릭 이벤트 핸들러 함수
 */
const CheckButton = ({ checked, onClick }) => {
  return (
    <label className={styles.box} htmlFor={styles['input-check']}>
      <input
        type="checkbox"
        name="check"
        id={styles['input-check']}
        checked={checked}
        onChange={(event) => onClick(event, !checked)}
      />
      <Button styleName="checkbox" onClick={(event) => onClick(event, !checked)}>
        <AiOutlineCheck className={styles.checkmark} />
      </Button>
    </label>
  );
};

export default CheckButton;
