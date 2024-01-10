import React from "react";
import { styled, Slider, Button,  Tooltip,  Popover, Grid, createTheme} from "@mui/material";
import {FastForward, FastRewind, Pause, PlayArrow, SkipNext, VolumeUp, VolumeOff} from "@mui/icons-material";
import VideoPlayer from "../VideoPlayer";





const Components = ({onPlayPause, playing, onRewind, 
                    onForward, played, onSeek, onSeekMouseUp, volume, 
                    onVolumeChangeHandler, onVolumeSeekUp,  mute, onMute,
                    duration, currentTime, componentRef}) => {
    

    return (

    <div className = "absolute top-[0px] bottom-0 flex flex-col justify-between bg-[#7b2cbf] bg-opacity-0 z-1 w-[90%]"
                        ref={componentRef}> 

        <div className="flex items-center justify-between m-[5px] mx-[20px] text-color-purple-500">
            <h2>Video PLayer</h2>
        </div>
        

        <div className="flex justify-center items-center"> 

            <div className="px-[10px] text-[#95A1F9]" onDoubleClick={onRewind}>
            <FastRewind fontSize="large" />
            </div>


            <div className="px-[10px] text-[#95A1F9]" onClick={onPlayPause}>
            {playing ? (
            <Pause fontSize="large" />
            ) : (
            <PlayArrow fontSize="large" />
            )}
            </div>
            

            <div className="px-[10px] text-[#95A1F9]" onDoubleClick={onForward}>
            <FastForward fontSize="large" />
            </div>
        </div>


        <div className="flex  flex-col justify-center items-left">

            <div className="flex items-center px-[16px]">
            <Slider
            sx={{
                color: "#95A1F9",
            }}
            valueLabelDisplay="auto"
            min = {0}
            max = {100}
            value = {played * 100}
            onChange={onSeek}
            onChangeCommitted={onSeekMouseUp}


            />
            </div>

            <div className="flex items-center justify-between">

                <div className="flex items-center py-[10px] w-[25%]">

                    <div className="px-[10px] text-[#95A1F9]">
                    <PlayArrow fontSize="medium" />
                    </div>
                    
                    <div className="px-[10px] text-[#95A1F9]">
                    <SkipNext fontSize="medium" />
                    </div>
                    
                    <div className="px-[10px] text-[#95A1F9]" onClick={onMute}>
                    {mute ? (
                    <VolumeOff fontSize="medium" />
                            ) : (
                    <VolumeUp fontSize="medium" />
                                )}
                    </div>

                    <Slider
                    sx={{
                        color: "#95A1F9",
                    }}
                    onChange={onVolumeChangeHandler}
                    value={volume * 100}
                    onChangeCommitted={onVolumeSeekUp}
                    />
                    <div className = "text-[#95A1F9] text-xs ml-[20px]">{ currentTime}</div>
                    <div className = "text-[#95A1F9] text-xs ml-[5px]"> : </div>
                    <div className = "text-[#95A1F9] text-xs ml-[5px]">{duration}</div>
                </div>
            </div>
        </div>


    </div>
    )
}
export default Components