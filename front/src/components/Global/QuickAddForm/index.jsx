import React from 'react';
import { FaPlus } from 'react-icons/fa';
import Button from 'components/Global/Button';
import IconButton from 'components/Global/IconButton';
import Input from 'components/Global/Input';
import styles from './styles.module.css';

/**
 * Task 내용만 입력하여 Task를 빠르게 추가하는 폼 컴포넌트
 * @param {boolean} props.isDetailButton - 디테일 버튼 표시 여부, 기본값 false
 * @param {Fucntion} props.onDetailClick - 디테일 버튼 클릭하면 실행할 콜백, 인풋 값 전달 받음
 * @param {Fucntion} props.onSubmit - 등록 버튼 클릭하면 실행할 콜백, 인풋 값 전달 받음
 * @param {string} props.styleName - 별도의 클래스를 지정하는 문자열
 * @param {string} props.placeholder - 입력이 없을 때 표시할 문자열
 * @param {Fucntion} props.validator - 입력에 대한 유효성 검사 함수
 */
const QuickAddForm = ({
  isDetailButton = false,
  onDetailClick,
  value,
  onChange,
  onSubmit,
  styleName,
  placeholder,
  validator,
}) => {
  const onClick = () => {
    // QuickAddForm 입력을 TaskModal로 전달하고 초기화
    if (onDetailClick instanceof Function) onDetailClick({ task: { content: value } });
  };

  return (
    <form className={`${styles.form} ${styles[styleName]}`} onSubmit={onSubmit}>
      {isDetailButton && (
        <IconButton Icon={FaPlus} styleName="QuickAddForm__icon" onClick={onClick} />
      )}
      <Input
        value={value}
        onChange={onChange}
        styleName={`QuickAddForm${styleName ? `_${styleName}` : ''}`}
        placeholder={placeholder}
        validator={validator}
      />
      <Button styleName="QuickAddForm" type="submit">
        등록
      </Button>
    </form>
  );
};

export default QuickAddForm;
