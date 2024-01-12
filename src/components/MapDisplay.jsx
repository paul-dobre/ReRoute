import React from "react";
import ReactMapGL from "react-map-gl"
import { useState } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';


const MapDisplay = () => {
    const [viewPort, setViewPort] = useState({
        latitude: 51.0,
        longitude: -114.0,
        width: '100vw',
        height: '100vh',
        zoom: 10,
    });
    
    //console.log(process.env.REACT_APP_MAPBOX_ACCESS_TOKEN)
    const token = "pk.eyJ1IjoibWFobW91ZGFsaTEiLCJhIjoiY2xyOW0wbW5sMDRyODJscnBlMnN4NjlvbiJ9.E1lIVvH7V0ad0ud-xp9jgQ"

    return (
        <section className={`flex md:flex-row flex-col w-[1000px] h-[800px] justify-center`}>
        <div className="w-full h-full justify-center">
            <ReactMapGL
              {...viewPort}
              onViewportChange={(newViewport) => setViewport(newViewport)}
              mapboxAccessToken={token}
              mapStyle="mapbox://styles/mapbox/navigation-night-v1" 
            >
            </ReactMapGL>
        </div>
        </section>
    );
};

export default MapDisplay;
