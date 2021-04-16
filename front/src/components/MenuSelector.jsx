import React, { useState } from 'react';
import styles from '../styles/MenuSelector.module.css';
import IconButton from './IconButton';

/**
 * 셀렉터의 클릭 이벤트를 처리하는 hook
 * @param {Object} iconList - react-icons에서 제공하는 아이콘 컴포넌트로 이루어진 리스트 객체 ( 같은 아이콘 중복 불가 )
 * @returns {{icons: Object, switchMenuPlace: Function}} 아이콘 이름이 담긴 객체와 클릭 이벤트 핸들링 함수가 담긴 객체
 */
const useSelector = iconList => {
  const initial = Object.keys(iconList).reduce(
    (icons, iconName, index) => {
      const updated = { ...icons };
      if (index === 0) {
        updated.active = iconName;
      } else {
        updated.others.push(iconName);
      }

      return updated;
    },
    { others: [] },
  );

  const [menu, setMenu] = useState(initial);

  const switchMenuPlace = iconName => {
    if (iconName === menu.active) return;
    const iconIndex = menu.others.findIndex(icon => icon === iconName);

    const others = [...menu.others];
    others[iconIndex] = menu.active;

    const updated = {
      active: iconName,
      others,
    };

    setMenu(updated);
  };

  return { menu, switchMenuPlace };
};

/**
 * 메뉴 셀렉터 컴포넌트
 *
 * @param {Object} props.iconList - react-icons에서 제공하는 아이콘 컴포넌트로 이루어진 리스트 객체 ( 같은 아이콘 중복 불가 )
 * @example
 * // BsListCheck, BiCalendarCheck 아이콘을 표시
 * <MenuSelector iconList={ {BsListCheck, BiCalendarCheck} }>
 * @description 마우스 오버 시 숨겨진 메뉴 아이콘들이 나타나며, 아이콘을 클릭하면 메인 아이콘과 위치가 변경됨
 */
const MenuSelector = ({ iconList, styleName }) => {
  const { menu, switchMenuPlace } = useSelector(iconList);

  const onMenuClick = menuName => {
    // 여기에 클릭 이벤트 핸들링 로직 추가
    switchMenuPlace(menuName);
  };

  return (
    <div className={styles.selector}>
      <div className={styles.container}>
        <div className={styles.selected}>
          <IconButton
            Icon={iconList[menu.active]}
            styleName={styleName}
            onClick={() => onMenuClick(menu.active)}
          />
        </div>
        <ul className={styles.hidden}>
          {menu.others.map(icon => (
            <li key={icon}>
              <IconButton
                Icon={iconList[icon]}
                styleName={styleName}
                onClick={() => onMenuClick(icon)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuSelector;
