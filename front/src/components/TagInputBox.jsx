import React, { useState } from 'react';
import colorManager from '../utils/color-manager';
import TagButton from './TagButton';
import styles from '../styles/InputBox.module.css';
import inputStyles from '../styles/Input.module.css';
import accountManager from '../utils/account-manager';

const useFlexInputSize = (intialSize) => {
  const [inputSize, setInputSize] = useState(intialSize);

  const flexInputSize = (length) => {
    if (length === 0) {
      setInputSize(intialSize);
      return;
    }
    setInputSize(length);
  };

  return { inputSize, flexInputSize };
};

/**
 * 재사용성을 높인 인풋 박스
 * @param {string} props.inputName - form에서 모든 input의 값을 객체로 받을 때 key로 쓰일 문자열
 * @param {string} props.placeholder - input의 placeholder 속성 값
 * @param {Function} props.validator - input의 유효성 검사를 수행할 콜백 함수, 반환하는 boolean 값에 따라 상태 변화 여부 결정
 */
const TagInputBox = ({ token, tags = [], inputName, validator, placeholder, setTags, tagList }) => {
  const [value, setValue] = useState('');
  const { inputSize, flexInputSize } = useFlexInputSize(0);

  const onClick = () => {};

  const addTag = async (name) => {
    const isMainTag = tags.length === 0;
    const tag = { name, color: colorManager.getRandomHex(), isMainTag };
    const tagId = await accountManager.addTag(token, tag);
    setTags((previous) => [...previous, { tagId, ...tag }]);
  };

  const onKeyDown = (event) => {
    if (event.target.value === '') return;
    if (event.key !== 'Enter') return;
    event.preventDefault();
    const name = event.target.value;
    addTag(name);
    setValue('');
    flexInputSize(0);
  };

  const onBlur = (event) => {
    if (event.target.value === '') return;
    addTag(event.target.value);
    setValue('');
    flexInputSize(0);
  };

  const onChange = (event) => {
    const text = event.target.value;
    const { length } = text;

    const korCount = [...text.matchAll(/[ㄱ-ㅎㅏ-ㅣ가-힣]+/g)].reduce(
      (count, arr) => count + String(arr).length,
      0,
    );
    flexInputSize(length >= 3 ? 0.95 * (length + korCount) : 3);
    setValue(text);
  };

  const onTagDelete = (id) => {
    setTags((previous) => {
      return [...previous].filter((tag) => tag.tagId !== id);
    });
    accountManager.deleteTag(token, id);
  };

  return (
    <label className={styles.inputBox} htmlFor={styles.inputBox}>
      <span className={styles.ModalNameTag}>태그</span>
      <ul className={styles.list}>
        {tags.map((tag) => (
          <li key={tag.tagId} className={styles.tagItem}>
            <TagButton
              tagId={tag.tagId}
              name={tag.name || tagList[tag.tagId].name}
              color={tag.color}
              onClick={onClick}
              onDelete={onTagDelete}
            />
          </li>
        ))}
      </ul>
      <input
        className={`${inputStyles.input} ${inputStyles.tagInput}`}
        id={styles.inputBox}
        value={value}
        name={inputName}
        placeholder={placeholder}
        validator={validator}
        size={inputSize || 3}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        maxLength="15"
      />
    </label>
  );
};

export default TagInputBox;
