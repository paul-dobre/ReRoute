import React from "react";
import ReactPlayer from 'react-player';
import Components from "./VideoComponents/Components";
import { useState } from "react";
import { useRef } from "react";
import { formatTime } from "./VideoComponents/FormatTime";

let count = 0    


const VideoPlayer = () => {

    // Calculate the height based on the aspect ratio and the width of the screen
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const videoHeight = Math.floor(windowHeight * 0.9); // Adjust the multiplier as needed

    const videoPlayerRef = useRef(null);

    const componentRef = useRef(null)

    const mouseMoveHandler = () => {
        
        componentRef.current.style.visibility = "visible";
        count = 0;
        {console.log("Value of count:", count)}
    };

    const rewindHandler = () => {
        //Rewinds the video player reducing 5
          videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() - 5);
        };

    const fastFowardHandler = () => {
        //FastFowards the video player by adding 10
        videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() + 10);
    };

    const [videoState, setVideoState] = useState({
        playing: false,
        muted: false,
        volume: 0.5,
        played: 0,
        seeking: false,
     Buffer : true
      });

      const {playing, muted, volume, playbackRate, played, seeking, buffer} = videoState


      const playPauseHandler = () => {
        //plays and pause the video (toggling)
          setVideoState({ ...videoState, playing: !videoState.playing });
        };

        const progressHandler = (state) => {
            if (count > 3){

                // toggling player component container
           
                componentRef.current.style.visibility = "hidden";
              
            } 
            else if (componentRef.current.style.visibility === "visible") {
                 count += 1;
            }

            
            if (!seeking) {
                setVideoState({ ...videoState, ...state });
            }
        };

        const seekHandler = (e, value) => {
            setVideoState({ ...videoState, played: parseFloat(value) / 100 });
        };

        const seekMouseUpHandler = (e, value ) => {
            setVideoState({ ...videoState, seeking: false });
            videoPlayerRef.current.seekTo(value / 100);
        };


        const volumeChangeHandler = (e, value) => {
            const newVolume = parseFloat(value) / 100;
              setVideoState({
                ...videoState,
                volume: newVolume,
                muted: Number(newVolume) === 0 ? true : false, // volume === 0 then muted
              })
           
        };


        const volumeSeekUpHandler = (e, value) => {
            const newVolume = parseFloat(value) / 100;
              setVideoState({
                ...videoState,
                volume: newVolume,
                muted: newVolume === 0 ? true : false,
            })
        };
        
        const muteHandler = () => {
            //Mutes the video player
              setVideoState({ ...videoState, muted: !videoState.muted });
        };

        //Handling time display
        const currentTime = videoPlayerRef.current? videoPlayerRef.current.getCurrentTime(): "00:00";
        const duration = videoPlayerRef.current? videoPlayerRef.current.getDuration(): "00:00";
        
        const formatCurrentTime = formatTime(currentTime)
        const formatDuration = formatTime(duration)
    
    return(
    <div className = "relative flex flex-col items-center justify-center w-full" onMouseMove={mouseMoveHandler}>
            <ReactPlayer
            ref={videoPlayerRef}
            className = " border-[4px] border-[#95A1F9] object-cover p-0 m-0"
            url = "https://www.youtube.com/watch?v=RDvT-UlULCc"
            width = "90%"
            height = {videoHeight}
            playing = {playing}
            volume = {volume}
            muted = {muted} 
            onProgress={progressHandler}
            />
            
            <Components onPlayPause={playPauseHandler} 
            playing = {playing} 
            onRewind={rewindHandler} 
            onForward={fastFowardHandler}
            played = {played}
            onSeek ={seekHandler}
            onSeekMouseUp ={seekMouseUpHandler}
            volume={volume}
            onVolumeChangeHandler={volumeChangeHandler}
            onVolumeSeekUp={volumeSeekUpHandler}
            mute = {muted}
            onMute = {muteHandler}
            duration = {formatDuration}
            currentTime={formatCurrentTime}
            componentRef = {componentRef}/>
            
            
    </div>
    );
};
export default VideoPlayer

