import React from 'react';
import styles from './styles.module.css';

/**
 * 외부로부터 내용을 주입 받는 모달 프레임 컴포넌트
 * @param {ReactElement} props.children - 여닫는 태그 사이에 기입하는 방식으로 주입 받아 표시할 컴포넌트
 * @param {string} props.styleName - 공통 스타일링에 대한 변형에 사용될 클래스명 문자열
 */
const Modal = ({ children, styleName, isBG, onBGClick }) => (
  <>
    {isBG && (
      <div
        className={`${styles.background} ${styles[styleName]}`}
        onClick={onBGClick}
        onKeyPress={() => {}}
        tabIndex="0"
        role="button"
      >
        <br className={styles.hidden} />
      </div>
    )}
    <section className={`${styles.modal} ${styles[styleName]}`}>{children}</section>
  </>
);

export default Modal;
