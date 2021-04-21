import React, { useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import styles from '../styles/CheckButton.module.css';
import Button from './Button';

const useCheckbox = (initialState) => {
  const [checked, setChecked] = useState(initialState || false);

  const switchChecked = () => {
    setChecked(!checked);
  };

  return { checked, switchChecked };
};

/**
 * 외부에서 checked 상태를 받아와 업데이트 할 수 있는 체크 버튼
 * @param {boolean} props.checked - 외부에서 값을 받아와 체크 상태의 초기값으로 설정되는 문자열
 * @param {Function} props.onClick - 클릭 이벤트 핸들러 함수
 */
const CheckButton = ({ checked, onClick }) => {
  const { checked: _checked, switchChecked } = useCheckbox(checked);

  const onButtonClick = (event) => {
    switchChecked();
    if (onClick instanceof Function) onClick(event);
  };

  return (
    <label className={styles.box} htmlFor={styles['input-check']}>
      <input
        type="checkbox"
        name="check"
        id={styles['input-check']}
        checked={_checked}
        onChange={switchChecked}
      />
      <Button styleName="checkbox" onClick={onButtonClick}>
        <AiOutlineCheck className={styles.checkmark} />
      </Button>
    </label>
  );
};

export default CheckButton;
