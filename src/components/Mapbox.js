import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.2.0/mapbox-gl-directions.js"

mapboxgl.accessToken = 'pk.eyJ1IjoibWFobW91ZGFsaTEiLCJhIjoiY2xyOW0wbW5sMDRyODJscnBlMnN4NjlvbiJ9.E1lIVvH7V0ad0ud-xp9jgQ';

export const MapboxMap = (mapID) => {
    var map = new mapboxgl.Map({
        container: mapID, // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-74.0066, 40.7135], // starting position [lng, lat]
        zoom: 14 // starting zoom level
      });
      
      return map;

};

