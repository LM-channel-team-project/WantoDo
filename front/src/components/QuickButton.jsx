import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import IconButton from './IconButton';

/** Create by 이승진(dltmdwls154@gmail.com)
 * 항상 우측 하단에 표시되고 클릭시 input 보이는 버튼
 */

const QuickButton = ({ onClick }) => {
  const onInputToggle = (event) => {
    if (onClick instanceof Function) onClick(event);
  };
  return (
    <IconButton Icon={FaPlusCircle} type="button" onClick={onInputToggle} styleName="quickButton" />
  );
};

export default QuickButton;
