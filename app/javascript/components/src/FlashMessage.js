import { useState } from "react";
import React from "react";
const FlashMessage = (props)=>{
    const closeMenuHandler  = ()=>{
        props.show();
    }
    return(<div className={"shoWflashMessage"}>
        <p>{props.text}</p>
        <button onClick={closeMenuHandler}>X</button>
    </div>);
};

export default FlashMessage;
