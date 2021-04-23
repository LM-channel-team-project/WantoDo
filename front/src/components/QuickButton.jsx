import React, {useState} from "react";
import {FaPlusCircle} from "react-icons/fa";


const QuickButton = ({ children: styleName}) => {
    const [openInput, setCloseInput] = useState(false);
    const toggleInput = () => {
        setCloseInput(!openInput);
    }
    return(
        <button type='button' onClick={toggleInput} styleName={styleName}
                onInputToggle={() => {/* 태스크 등록 창 토글 로직 작성 */}} >
            {/* QuickButton.module.css 에서 styleName은 아이콘 크기와 위치 스타일 */}
            <FaPlusCircle/>
        </button>
    );
};

export default QuickButton;
