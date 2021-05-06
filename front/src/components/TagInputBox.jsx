import React from 'react';
import Input from './Input';
import TagButton from './TagButton';
import styles from '../styles/InputBox.module.css';

/**
 * 재사용성을 높인 인풋 박스
 * @param {string} props.inputName - form에서 모든 input의 값을 객체로 받을 때 key로 쓰일 문자열
 * @param {string} props.placeholder - input의 placeholder 속성 값
 * @param {Function} props.validator - input의 유효성 검사를 수행할 콜백 함수, 반환하는 boolean 값에 따라 상태 변화 여부 결정
 */
const TagInputBox = ({ tags = [], inputName, validator, placeholder }) => {
  const onClick = () => {};

  return (
    <label className={styles.inputBox} htmlFor={styles.inputBox}>
      <span className={styles.name}>태그</span>
      <ul className={styles.list}>
        {tags.map((tag) => (
          <li key={tag.id} className={styles.tagItem}>
            <TagButton name={tag.name} color={tag.color} onClick={onClick} />
          </li>
        ))}
      </ul>
      <Input
        id={styles.inputBox}
        name={inputName}
        placeholder={placeholder}
        validator={validator}
        styleName="tagInput"
        size={3}
      />
    </label>
  );
};

export default TagInputBox;
