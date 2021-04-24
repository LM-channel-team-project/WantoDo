import React from "react";
import {FaPlusCircle} from "react-icons/fa";
import IconButton from "./IconButton";

/** Create by 이승진(dltmdwls154@gmail.com)
 * 항상 우측 하단에 표시되고 클릭시 input 보이게
 * @param {변수타입} props.styleName - 커스텀 스타일을 위한 스타일 네임
 *
 */

const QuickButton = () => {
    const onInputToggle = () => {
        // 인풋 토글 로직 작성
    }
    return(
        <IconButton type='button' onClick={onInputToggle} styleName='quickButton'>
            <FaPlusCircle/>
        </IconButton>
    );
};

export default QuickButton;
