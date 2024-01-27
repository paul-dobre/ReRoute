import React, {useEffect, useState} from "react";
import "leaflet/dist/leaflet.css"
import L, { map, polyline } from "leaflet";
import {Icon} from "leaflet"
import * as esri from 'esri-leaflet';
import * as vec from 'esri-leaflet-vector';
import { ApiKeyManager } from "@esri/arcgis-rest-request";
import PolygonBarrier from "@arcgis/core/rest/support/PolygonBarrier"
import PolyLine from '@arcgis/core/geometry/Polyline'
import Graphic from '@arcgis/core/Graphic'


const customIcon = new Icon({
  iconUrl: "CustomMarker.svg",
  iconSize: [38,38]
});

const MapLeaf = () => {


  
  useEffect(() => {
    // Create the map
    const map = L.map("map", { minZoom: 2 }).setView([51,-114], 13);
    

    // Add basemap
    const apiKey = "AAPK3c3f7569a5364ebf989232a728f5cbbbD0PGCXGZqbFvXv3e1oUb76gUENrlq1_yhMDPKhunJRKWbLKb2OdXPodGKWPO3UkL";
    vec.vectorBasemapLayer("arcgis/navigation-night", { apiKey: apiKey }).addTo(map);

    const directions = document.createElement("div");
    directions.id = "directions";
    directions.innerHTML = "Click on the map to create a start and end for the route.";
    document.body.appendChild(directions);

    const startLayerGroup = L.layerGroup().addTo(map);
    
    let currentStep = "start";
    let startCoords, endCoords;

    //Buffer Radius
    let radius = 1.5; //in km
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
        console.log(ResponseData);
        //console.log(ResponseData.polygonBarriers.features[0].geometry.rings[0]);

        let polylineSymbol = {
          type: "simple-line",  // autocasts as SimpleLineSymbol()
          color: [226, 119, 40],
          width: 4
        };
        if (ResponseData.routes && ResponseData.routes.features && ResponseData.routes.features.length > 0) {
          var coords = ResponseData.routes.features[0].geometry.paths[0];
          
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

        let polyline = L.polyline(coords, {color: 'blue'});
        startLayerGroup.addLayer(polyline);

        //const directionsHTML = response.directions[0].features.map((f) => f.attributes.text).join("<br/>");
        //directions.innerHTML = directionsHTML;
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
        startLayerGroup.clearLayers()

        let marker1 = L.marker(e.latlng, {icon: customIcon});
        startLayerGroup.addLayer(marker1);
        startCoords = coordinates;
        currentStep = "end";
      } else {
        let marker2 = L.marker(e.latlng, {icon: customIcon});
        startLayerGroup.addLayer(marker2);
        endCoords = coordinates;
      
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
    
    <div id="map" className={`flex md:flex-row flex-col w-[1000px] h-[800px] justify-center`}></div>
  );
};

export default MapLeaf;