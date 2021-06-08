import React, { useState } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from 'store/store';
import TagButton from 'components/Global/TagButton';
import Input from 'components/Global/Input';
import AutoCompleteBox from 'components/Global/AutoCompleteBox';
import accountManager from 'utils/account-manager';
import colorManager from 'utils/color-manager';
import generateId from 'utils/id-generator';
import useInput from 'hooks/useInput';
import styles from 'components/Global/InputBox/styles.module.css';

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

const searchText = (list, text) =>
  Object.values(list)
    .reduce((arr, tag) => {
      if (text.length < 2) return [];

      if (tag.name.includes(text)) {
        arr.push(tag);
      }

      return arr;
    }, [])
    .sort((a, b) => a.name.length - b.name.length);

/**
 * 재사용성을 높인 인풋 박스
 * @param {string} props.token - 사용자 id token 문자열
 * @param {string} props.placeholder - input의 placeholder 속성 값
 * @param {Array} props.tags - 상위 컴포넌트의 지역 태그 상태를 담고 있는 배열
 * @param {Object} props.tagList - 전역 태그 상태를 담고 있는 객체
 * @param {Function} props.setTags - 지역 태그 상태를 업데이트 하는 함수
 * @param {Function} props.updateTag - 전역 태그 상태에 태그를 하나 추가하는 함수
 */
const TagInputBox = ({ token, placeholder, tags = [], tagList, setTags, updateTag, setAlert }) => {
  const [modal, setModal] = useState(false);
  const { value, onChange, reset } = useInput();
  const { inputSize, flexInputSize } = useFlexInputSize(0);

  const searchedTags = searchText(tagList, value);

  const inputId = generateId();

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
    // 같은 이름의 태그가 있으면 그대로 사용
    let tag = Object.values(tagList).find((_tag) => _tag.name === name);

    if (tag == null) {
      // 같은 이름 없으면 새롭게 추가
      tag = { name, color: colorManager.getRandomHex() };
      tag.tagId = await accountManager.addTag(token, tag);
    }

    // 태스크에 등록된 태그 중에 같은 태그 있는지 검사
    if (tags.length && tags.some((_tag) => _tag.name === name)) {
      setAlert({ display: true, message: '이미 추가된 태그입니다', confirm: '확인' });
      return;
    }

    tag.isMainTag = tags.length === 0;
    setTags((previous) => [...previous, tag]);
    updateTag(tag.tagId, tag);
  };

  const onKeyDown = (event) => {
    if (value === '' || value.length < 2) return;
    if (event.key !== 'Enter') return;
    event.preventDefault();

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
  };

  return (
    <>
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
        <div className={styles.autoCompleteBox}>
          <Input
            styleName="tagInput"
            value={value}
            placeholder={placeholder}
            validator={(text) => !text.includes(' ')}
            size={inputSize || 3}
            onChange={(event) => {
              setModal(true);
              onValueChange(event);
            }}
            onKeyDown={onKeyDown}
            maxLength="15"
          />
          {searchedTags.length > 0 && modal && (
            <AutoCompleteBox
              list={searchedTags}
              onItemClick={(tag) => {
                addTag(tag.name);
                reset();
              }}
            />
          )}
        </div>
      </label>
      {modal && (
        <div
          className={styles.modalBackground}
          onClick={() => setModal(false)}
          onKeyPress={() => {}}
          tabIndex="0"
          role="button"
        >
          <br className={styles.hidden} />
        </div>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTag: (tagId, tag) => dispatch(actionCreators.updateTag(tagId, tag)),
  };
};

export default connect(undefined, mapDispatchToProps)(TagInputBox);
