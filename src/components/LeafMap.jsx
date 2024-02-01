import React, { useEffect, useRef } from 'react';
import {createMap} from './LeafMap.js';
import { MapboxMap } from './Mapbox.js';

const LeafMap = () => {

    const mapContainerRef = useRef(null);
    
    useEffect(()=>{
        const map = MapboxMap('map');
        
        return () => {
            map.remove();
        }
    }, []);
  return (
    <div id="map" className={`flex md:flex-row flex-col w-[1000px] h-[800px] justify-center`}></div>
  )
}

export default LeafMap