import React, {useEffect, useState} from 'react';
import styles from "../style.js";
import { BsPlusCircle, BsFillFileEarmarkTextFill, BsPencilSquare} from "react-icons/bs";
import { Link } from "react-router-dom";


const MapSidebar = () => {
    return (
        <div className={`right-0 h-screen w-16 m-0 flex flex-col bg-transparent text-white p-4`}>
            <Link to = "/"><SideBarIcon Icon={<BsPlusCircle size="28" />} text="Add File"></SideBarIcon></Link> 
            <Link to = "/"><SideBarIcon Icon={<BsPencilSquare size="28" />} text="Draw Buffer"></SideBarIcon></Link>
            <Link to = "/"><SideBarIcon Icon={<BsFillFileEarmarkTextFill size="28"/>} text="Generate Report"></SideBarIcon></Link>
        </div>
    );
};


const SideBarIcon = ({Icon, text = 'words'}) => (
    <div className = "sb-icons group">
        {Icon}
        <span className="sb-words group-hover:scale-100">
            {text}
        </span>
    </div>
)



export default MapSidebar