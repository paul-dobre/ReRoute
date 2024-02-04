import React, {useEffect, useState} from 'react';
import styles from "../style.js";
import { BsPlusCircle, BsFillFileEarmarkTextFill, BsPencilSquare, BsTools, BsGlobe, BsArrowCounterclockwise, BsFillRecordCircleFill} from "react-icons/bs";
import { TbShape3 } from "react-icons/tb";
import { Link } from "react-router-dom";

 
const MapSidebar = () => {
    const [toolclicked, settoolClicked] = useState(false);
    const [actionclicked, setactionClicked] = useState(false);
    

    const handletoolClick = () => {
        settoolClicked(!toolclicked);
        setactionClicked(false);
    };

    const handleactionClick = () => {
        setactionClicked(!actionclicked);
    };

    return (
        <div className={`h-screen bg-transparent text-white p-4`}>
            <button className="mt-48" onClick={handletoolClick}>
                <SideBarIcon Icon={<BsTools size="28" />} text="Toolbar" className={`${toolclicked ? 'clicked' : ''}`}></SideBarIcon>
            </button>
            {toolclicked && (
                <div className ={`flex flex-col absolute right-40 top-56`}>
                    <button  onClick={handleactionClick}>
                        <SideBarIcon Icon={<BsPencilSquare size="28" />} text="Draw Buffer" className={`${actionclicked ? 'clicked' : ''}`}></SideBarIcon>
                    </button>
                    {actionclicked && (
                        <div className = {`flex flex-col absolute left-20 -top-44`}>
                            <button><SideBarIcon Icon={<BsGlobe size="28"/>} text="Coordinates" ></SideBarIcon></button>
                            <button><SideBarIcon Icon={<TbShape3 size="28"/>} text="Polyline"></SideBarIcon></button>
                            <button><SideBarIcon Icon={<BsFillRecordCircleFill size="28" />} text="Radius"></SideBarIcon></button>
                            <button><SideBarIcon Icon={<BsArrowCounterclockwise size="28" />} text="Reset"></SideBarIcon></button>
                        </div>
                    )}
                    <button><SideBarIcon Icon={<BsPlusCircle size="28" />} text="Add File"></SideBarIcon></button>

                    <button><SideBarIcon Icon={<BsFillFileEarmarkTextFill size="28"/>} text="Generate Report"></SideBarIcon></button>
                </div>
            )} 

        </div>
    );
};


const SideBarIcon = ({ Icon, text = 'words'}) => (
        <div className = "sb-icons group">
            {Icon}
            <span className="sb-words group-hover:scale-100">
                {text}
            </span>
        </div>

)


export default MapSidebar