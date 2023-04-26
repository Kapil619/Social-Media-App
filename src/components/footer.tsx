import React from "react";
import './App.css';


export const footer = () =>{
    const currentYear= new Date().getFullYear();
    return (
        <div className="foot-note"> 
            <span>Copyright © {currentYear} </span>
        </div>
    )
}

export default footer;

// not used