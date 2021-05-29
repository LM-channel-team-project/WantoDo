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
  let isMouseDown = false;

  const onTagMouseDown = (event) => {
    if (isMainTag) return;

    isMouseDown = true;

    const badge = event.currentTarget.querySelector('div[data-type="badge"]');
    const box = badge.parentElement;
    const filter = badge.lastElementChild;

    const list = event.currentTarget.closest('ul');
    const badges = list.querySelectorAll('div[data-type="badge"]');

    Array.from(badges).forEach((otherBadge) => {
      if (otherBadge === badge) return;
      const otherFilter = otherBadge.lastElementChild;
      otherBadge.classList.add(styles.fadeout);
      otherFilter.classList.add(styles.fadein);
    });

    badge.classList.add(styles.fadein);
    filter.classList.add(styles.fadeout);
    box.classList.add(styles.tremble);

    setTimeout(() => {
      if (isMainTag) return;
      if (isMouseDown) return;

      Array.from(badges).forEach((otherBadge) => {
        if (otherBadge === badge) return;
        const otherFilter = otherBadge.lastElementChild;
        otherBadge.classList.remove(styles.fadeout);
        otherFilter.classList.remove(styles.fadein);
      });

      badge.classList.remove(styles.fadein);
      filter.classList.remove(styles.fadeout);
      box.classList.remove(styles.tremble);
    }, 1000);

    if (event.defaultPrevented) return; // delete 버튼이 클릭될 때는 실행하지 않음

    if (onMouseDown instanceof Function) onMouseDown(tagId);
  };

  const onTagMouseUp = (event) => {
    const badge = event.currentTarget.querySelector('div[data-type="badge"]');
    const box = badge.parentElement;
    const filter = badge.lastElementChild;

    const list = event.currentTarget.closest('ul');
    const badges = list.querySelectorAll('div[data-type="badge"]');

    Array.from(badges).forEach((otherBadge) => {
      if (otherBadge === badge) return;
      const otherFilter = otherBadge.lastElementChild;

      otherBadge.classList.remove(styles.fadeout);
      otherFilter.classList.remove(styles.fadein);
    });

    badge.classList.remove(styles.fadein);
    filter.classList.remove(styles.fadeout);
    box.classList.remove(styles.tremble);

    if (event.defaultPrevented) return; // delete 버튼이 클릭될 때는 실행하지 않음

    if (onMouseUp instanceof Function) onMouseUp(event);
  };

  const onKeyDown = () => {};
  return (
    <div
      className={styles.container}
      onMouseDown={onTagMouseDown}
      onMouseUp={onTagMouseUp}
      onKeyDown={onKeyDown}
      role="button"
      tabIndex="0"
    >
      {onMouseDown && (
        <div className={styles.box}>
          <div className={`${styles.badge} ${isMainTag ? styles.color : ''}`} data-type="badge">
            <div className={styles.main}>M</div>
            <div className={styles.filter} />
          </div>
        </div>
      )}
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
