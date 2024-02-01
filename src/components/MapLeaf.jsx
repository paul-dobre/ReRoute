import React, {useEffect, useState} from "react";
import "leaflet/dist/leaflet.css"
import L, { map, polyline } from "leaflet";
import {Icon} from "leaflet"
import { FaArrowRight, FaArrowLeft, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import * as esri from 'esri-leaflet';
import * as vec from 'esri-leaflet-vector';
import { ApiKeyManager } from "@esri/arcgis-rest-request";
import PolygonBarrier from "@arcgis/core/rest/support/PolygonBarrier"
import PolyLine from '@arcgis/core/geometry/Polyline'
import Graphic from '@arcgis/core/Graphic'
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import * as turf from '@turf/turf'
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'; 
import { Geocoder } from 'leaflet-control-geocoder'; 

const customIcon = new Icon({
  iconUrl: "CustomMarker.svg",
  iconSize: [38,38]
});

const MapLeaf = () => {
  const [direcArr, setDirecArr] = useState([]);

  useEffect(() => {
    // Create the map
    const map = L.map("map", { minZoom: 2 }).setView([51.14215,-114.233330], 13);
    

    // Add basemap
    const apiKey = "AAPK3c3f7569a5364ebf989232a728f5cbbbD0PGCXGZqbFvXv3e1oUb76gUENrlq1_yhMDPKhunJRKWbLKb2OdXPodGKWPO3UkL";
    L.tileLayer("https://api.mapbox.com/styles/v1/ypaul/clrbbh2e4002d01re65us9mvk/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoieXBhdWwiLCJhIjoiY2xyYjV5eHZqMGtxajJpcnN4Zm1kOGU4YSJ9.nkPc81nO8sFFfAEin7TN1w", {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const startLayerGroup = L.layerGroup().addTo(map);
    
    let currentStep = "start";
    let startCoords, endCoords;
    let startLat = null;
    let startLon = null;
    let endLat = null;
    let endLon = null;
    let routeControl = null;
    let waypoints = null;
    
    //Buffer Radius
    let radius = 1; //in km
    let center = map.getCenter();
    let topLeftPoint = [center.lng-(radius/110), center.lat-(radius/110)];
    let topRightPoint = [center.lng+(radius/110), center.lat-(radius/110)];
    let bottomLeftPoint = [center.lng-(radius/110), center.lat+(radius/110)];
    let bottomRightPoint = [center.lng+(radius/110), center.lat+(radius/110)];

    //round to 3 decimal places
    topLeftPoint = [topLeftPoint[0].toFixed(3), topLeftPoint[1].toFixed(3)];
    topRightPoint = [topRightPoint[0].toFixed(3), topRightPoint[1].toFixed(3)];
    bottomLeftPoint = [bottomLeftPoint[0].toFixed(3), bottomLeftPoint[1].toFixed(3)];
    bottomRightPoint = [bottomRightPoint[0].toFixed(3), bottomRightPoint[1].toFixed(3)];

    console.log(topLeftPoint);

    const updateRoute = async (url) => 
    {
      const authentication = ApiKeyManager.fromKey(apiKey);

      try {
      const response = await fetch(url)

      if (!response.ok) {

        // Assuming the API returns an error message in the response body
        const errorData = await response.json();
        const errorMessage = errorData.message || response.statusText;
        throw new Error(`API error: ${errorMessage}`);

      }
        const ResponseData = await response.json();
        console.log("response data:")
        console.log(ResponseData.directions[0].features[0].attributes.text);
        //console.log(ResponseData.polygonBarriers.features[0].geometry.rings[0]);

        let polylineSymbol = {
          type: "simple-line",  // autocasts as SimpleLineSymbol()
          color: [226, 119, 40],
          width: 4
        };
        if (ResponseData.routes && ResponseData.routes.features && ResponseData.routes.features.length > 0) {
          var coords = ResponseData.routes.features[0].geometry.paths[0];
          let directions = ResponseData.directions[0].features
          setDirecArr(prevDirecArr => [
            ...prevDirecArr,
            ...directions.map(direction => direction.attributes.text)
          ]);
          
          console.log("direction array")
          console.log(direcArr);
          
          // Rest of your code here...
        } else {
          console.error("No route data available in the response.");
        }

        for (let i = 0; i < coords.length; i++) {
          const temp = coords[i][0];
          coords[i][0] = coords[i][1];
          coords[i][1] = temp;
      }

      var polycoords = ResponseData.polygonBarriers.features[0].geometry.rings[0];

      for (let i = 0; i < polycoords.length; i++) {
        const temp = polycoords[i][0];
        polycoords[i][0] = polycoords[i][1];
        polycoords[i][1] = temp;
      }
      
        L.polygon(polycoords, {color: 'red'}).addTo(map);
      

        let polyline = L.polyline(coords, {color: 'blue'}).addTo(map);
        startLayerGroup.addLayer(polyline);

        waypoints = coords.map(function(coord) {
          return L.latLng(coord[0], coord[1]); // Note the order: latitude, longitude
        });

        startCoords = null;
        endCoords = null;
      } catch(error) {
        console.error(error);
        alert("There was a problem using the route service. See the console for details.");
      };
    };

    map.on("click", (e) => {

      const coordinates = [e.latlng.lng, e.latlng.lat];

      if (currentStep === "start"){
        console.log('at start')
        startLayerGroup.clearLayers();
        setDirecArr([]);
      
        let marker1 = L.marker(e.latlng, {icon: customIcon});
        startLayerGroup.addLayer(marker1);
        startCoords = coordinates;
        let startLat = startCoords[1];
        let startLon = startCoords[0];
        currentStep = "end";
      } else {
        let marker2 = L.marker(e.latlng, {icon: customIcon});
        startLayerGroup.addLayer(marker2);
        endCoords = coordinates;
        let endLat = endCoords[1];
        let endLon = endCoords[0];
      
        currentStep = "start";
      }

      if (startCoords && endCoords){
        const url = `https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve?returnPolygonBarriers=true&outSR=4326&f=json&polygonBarriers=%7B%22features%22%3A%5B%7B%22geometry%22%3A%7B%22rings%22%3A%5B%5B%5B${topLeftPoint[0]}%2C${topLeftPoint[1]}%5D%2C%5B${topRightPoint[0]}%2C${topRightPoint[1]}%5D%2C%5B${bottomRightPoint[0]}%2C${bottomRightPoint[1]}%5D%2C%5B${bottomLeftPoint[0]}%2C${bottomLeftPoint[1]}%5D%5D%5D%7D%2C%22attributes%22%3A%7B%22Name%22%3A%22Flood%20zone%22%2C%22BarrierType%22%3A0%7D%7D%5D%7D&token=AAPK3c3f7569a5364ebf989232a728f5cbbbD0PGCXGZqbFvXv3e1oUb76gUENrlq1_yhMDPKhunJRKWbLKb2OdXPodGKWPO3UkL&stops=${startCoords[0]},${startCoords[1]};${endCoords[0]},${endCoords[1]}&startTime=now&returnDirections=true`;
        updateRoute(url);
      }
    });


    return () => {
      map.off("click")
      map.remove();
    };
  }, [map]);


  return (
    <>
      <div id="map" className={`flex md:flex-row flex-col w-[1000px] h-screen justify-center z-0`}>
      </div>
      <div className="flex flex-col absolute w-[400px] h-[500px] top-30 right-80 z-20 bg-white border-white opacity-40 rounded-xl">
          {direcArr.map((directionText, index) => (
            <div key={index} className=" text-black text-opacity-100 font-bold flex flex-row">
              {directionText.toLowerCase().includes('right') && <FaArrowRight className="mr-2" />}
              {directionText.toLowerCase().includes('left') && <FaArrowLeft className="mr-2" />}
              {!directionText.toLowerCase().includes('right') && !directionText.toLowerCase().includes('left') && <FaArrowUp className="mr-2" />}   
              {directionText}
            </div>
          ))}
      </div>
    </>
    
  );
};

export default MapLeaf;