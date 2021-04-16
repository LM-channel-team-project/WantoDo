import React from 'react';
import Button from './Button';
import styles from '../styles/IconButton.module.css';

/**
 * 아이콘 버튼 컴포넌트
 * @param Icon extends React.Component, 버튼에 들어갈 아이콘 컴포넌트
 * @param text string, 버튼에 들어갈 내용 문자열
 * @param type string, 버튼 타입을 지정하는 문자열 ('button' 또는 'submit')
 * @param styleName string, 기본 버튼과 아이콘의 스타일에 변형을 줄 클래스 이름 문자열
 * @param onClick function, 버튼에서 클릭 이벤트가 발생하면 호출될 함수
 */
const IconButton = ({ Icon, children: text, type, styleName, onClick }) => {
  const iconState = text ? 'icon' : 'onlyIcon';

  return (
    // Button.module.css에서 styleName은 버튼 전체 스타일에 변형을 줄 클래스명
    <Button type={type} styleName={styleName} onClick={onClick}>
      {/* IconButton.module.css에서 styleName은 버튼 안에 들어간 아이콘의 스타일을 개별적으로 변형하는 클래스명 */}
      {Icon && <Icon className={`${styles[iconState]} ${styles[styleName]}`} />}
      {text || ''}
    </Button>
  );
};

export default IconButton;