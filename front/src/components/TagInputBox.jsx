import React, { useState } from 'react';
import { connect } from 'react-redux';
import TagButton from './TagButton';
import Input from './Input';
import accountManager from '../utils/account-manager';
import colorManager from '../utils/color-manager';
import generateId from '../utils/id-generator';
import useInput from '../hooks/useInput';
import styles from '../styles/InputBox.module.css';
import { actionCreators } from '../store/store';

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
 * @param {string} props.token - 사용자 id token 문자열
 * @param {string} props.placeholder - input의 placeholder 속성 값
 * @param {Array} props.tags - 상위 컴포넌트의 지역 태그 상태를 담고 있는 배열
 * @param {Object} props.tagList - 전역 태그 상태를 담고 있는 객체
 * @param {Function} props.setTags - 지역 태그 상태를 업데이트 하는 함수
 * @param {Function} props.updateTag - 전역 태그 상태에 태그를 하나 추가하는 함수
 */
const TagInputBox = ({ token, placeholder, tags = [], tagList, setTags, updateTag }) => {
  const inputId = generateId();
  const { value, onChange, reset } = useInput();
  const { inputSize, flexInputSize } = useFlexInputSize(0);
  let isMouseDown = false;

  const onTagMouseDown = (tagId) => {
    isMouseDown = true;
    setTimeout(() => {
      // 메인 태그 지정
      if (isMouseDown) {
        const updated = tags.map((tag) => {
          const copied = { ...tag };
          if (copied.tagId === tagId) {
            copied.isMainTag = true;
          } else {
            copied.isMainTag = false;
          }
          return copied;
        });
        setTags(updated);
        isMouseDown = false;
      }
    }, 1000);
  };

  const onTagMouseUp = () => {
    isMouseDown = false;
  };

  const addTag = async (name) => {
    const isMainTag = tags.length === 0;
    const tag = { name, color: colorManager.getRandomHex(), isMainTag };
    const tagId = await accountManager.addTag(token, tag);
    setTags((previous) => [...previous, { tagId, ...tag }]);
    updateTag(tagId, tag);
  };

  const onKeyDown = (event) => {
    if (value === '' || value.length < 2) return;
    if (event.key !== 'Enter') return;
    event.preventDefault();

    addTag(value);
    reset();
    flexInputSize(0);
  };

  const onBlur = () => {
    if (value === '' || value.length < 2) return;

    addTag(value);
    reset();
    flexInputSize(0);
  };

  const onValueChange = (event) => {
    const text = event.target.value;
    const { length } = text;

    const korCount = [...text.matchAll(/[ㄱ-ㅎㅏ-ㅣ가-힣]+/g)].reduce(
      (count, arr) => count + String(arr).length,
      0,
    );
    flexInputSize(length >= 3 ? 0.95 * length + korCount * 0.85 : 3);
    onChange(event);
  };

  const onTagDelete = (id) => {
    setTags((previous) => {
      return [...previous].filter((tag) => tag.tagId !== id);
    });
    // 태그 관리 플로우 결정 전까지 삭제 요청 비활성화
    // accountManager.deleteTag(token, id);
  };

  const validator = (text) => {
    return !text.includes(' ');
  };

  return (
    <label className={styles.inputBox} htmlFor={inputId}>
      <span className={styles.ModalNameTag}>태그</span>
      <ul className={styles.list}>
        {tags.map((tag) => (
          <li key={tag.tagId} className={styles.tagItem}>
            <TagButton
              tagId={tag.tagId}
              name={tag.name || tagList[tag.tagId].name}
              color={tag.color || tagList[tag.tagId].color}
              isMainTag={tag.isMainTag}
              onMouseDown={onTagMouseDown}
              onMouseUp={onTagMouseUp}
              onDelete={onTagDelete}
            />
          </li>
        ))}
      </ul>
      <Input
        styleName="tagInput"
        id={inputId}
        value={value}
        placeholder={placeholder}
        validator={validator}
        size={inputSize || 3}
        onChange={onValueChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        maxLength="15"
      />
    </label>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTag: (tagId, tag) => dispatch(actionCreators.updateTag(tagId, tag)),
  };
};

export default connect(undefined, mapDispatchToProps)(TagInputBox);
