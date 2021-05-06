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
const TagButton = ({ name, color, onClick }) => {
  const onTagClick = (event) => {
    if (event.defaultPrevented) return; // delete 버튼이 클릭될 때는 실행하지 않음

    if (onClick instanceof Function) onClick(event);
  };

  const onDeleteClick = (event) => {
    event.preventDefault();
    // 태그 삭제 로직 작성
  };

  return (
    <textbox className={styles.tag} onClick={onTagClick}>
      <Tag name={name} color={color} styleName="tagButton">
        <span className={styles.delete} data-hover="show">
          <IconButton styleName="tagDelete" onClick={onDeleteClick}>
            <TiDelete />
          </IconButton>
        </span>
      </Tag>
    </textbox>
  );
};

export default TagButton;
