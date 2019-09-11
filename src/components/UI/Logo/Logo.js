import React from 'react';
import imgPath from "../../../assets/images/burger-logo.png"; 

const logo = (props) => {
    return (
        // <div >
            <img src={imgPath} style={{height:"-webkit-fill-available"}} alt='Logo'/>
        // </div>
    );
};

export default logo;