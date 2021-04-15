import React from 'react';
import styles from '../styles/Button.module.css';

/**
 * 일반적인 버튼 컴포넌트
 * @param content extends React.Component | string, children으로 전달된, 버튼에 들어갈 내용 컴포넌트 혹은 문자열
 * @param type string, 버튼 타입을 지정하는 문자열 ('button' 또는 'submit')
 * @param styleName string, 기본 버튼 스타일을 변형할 클래스 이름 문자열
 * @param onClick function, 버튼에서 클릭 이벤트가 발생하면 호출될 함수
 */
const Button = ({ children: content, type, styleName, onClick }) => {
  const onButtonClick = event => {
    event.preventDefault();
    if (onClick instanceof Function) onClick(event);
  };

  return (
    <button
      // styleName 클래스 동적으로 변경
      className={`${styles.button} ${styles[styleName]}`}
      type={type === 'submit' ? 'submit' : 'button'}
      onClick={onButtonClick}
    >
      {content}
    </button>
  );
};

export default Button;
