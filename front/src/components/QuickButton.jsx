import React from "react";
import {FaPlusCircle} from "react-icons/fa";


const QuickButton = ({styleName, onClick}) => {
    const Style = {
        fontSize: "50px",
        cursor: "pointer",
    };
    return(
        <div>
            <FaPlusCircle style={Style} onClick={onClick} styleName={styleName}/>

        </div>
    );
};

export default QuickButton;
