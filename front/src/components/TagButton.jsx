import React from 'react';
import { TiDelete } from 'react-icons/ti';
import Tag from './Tag';
import IconButton from './IconButton';
import styles from '../styles/TagButton.module.css';

/** Created by 오영롱(youngrongoh) on 2021/04/23
 * 태그 라벨 컴포넌트
 * @param {text} props.name - 태그명을 나타내는 문자열
 * @param {text} props.color - 태그 색상을 설정하는 문자열, 5-10가지 종류 색상을 지정해서 사용
 * @param {Function} props.onClick - 태그 색상을 설정하는 문자열, 5-10가지 종류 색상을 지정해서 사용
 */
const TagButton = ({ tagId, name, color, isMainTag, onMouseDown, onMouseUp, onDelete }) => {
  const onTagMouseDown = (event) => {
    if (event.defaultPrevented) return; // delete 버튼이 클릭될 때는 실행하지 않음

    if (onMouseDown instanceof Function) onMouseDown(tagId);
  };

  const onTagMouseUp = (event) => {
    if (event.defaultPrevented) return; // delete 버튼이 클릭될 때는 실행하지 않음

    if (onMouseUp instanceof Function) onMouseUp(event);
  };

  const onKeyDown = () => {};

  return (
    <div
      className={isMainTag ? styles.main : ''}
      onMouseDown={onTagMouseDown}
      onMouseUp={onTagMouseUp}
      onKeyDown={onKeyDown}
      role="button"
      tabIndex="0"
    >
      <Tag name={name} color={color} styleName="tagButton">
        <span className={styles.delete} data-hover="show">
          <IconButton styleName="tagDelete" onClick={() => onDelete(tagId)}>
            <TiDelete />
          </IconButton>
        </span>
      </Tag>
    </div>
  );
};

export default TagButton;
