import React, {useEffect, useState} from "react";
import "leaflet/dist/leaflet.css"
import L, { polyline } from "leaflet";
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
    const map = L.map("map", { minZoom: 2 }).setView([42.5,-96.44], 13);
    

    // Add basemap
    const apiKey = "AAPK3c3f7569a5364ebf989232a728f5cbbbD0PGCXGZqbFvXv3e1oUb76gUENrlq1_yhMDPKhunJRKWbLKb2OdXPodGKWPO3UkL";
    vec.vectorBasemapLayer("arcgis/navigation-night", { apiKey: apiKey }).addTo(map);

    const directions = document.createElement("div");
    directions.id = "directions";
    directions.innerHTML = "Click on the map to create a start and end for the route.";
    document.body.appendChild(directions);

    const startLayerGroup = L.layerGroup().addTo(map);
    const endLayerGroup = L.layerGroup().addTo(map);
    const routeLines = L.layerGroup().addTo(map);

    let currentStep = "start";
    let startCoords, endCoords;


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
        routeLines.clearLayers();
        const ResponseData = await response.json();
        console.log(ResponseData.polygonBarriers.features[0].geometry.rings[0]);

        let polylineSymbol = {
          type: "simple-line",  // autocasts as SimpleLineSymbol()
          color: [226, 119, 40],
          width: 4
        };
        var coords = ResponseData.routes.features[0].geometry.paths[0];

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

        L.polyline(coords, {color: 'red'}).addTo(map);


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
        startLayerGroup.clearLayers();
        endLayerGroup.clearLayers();
        routeLines.clearLayers();

        L.marker(e.latlng, {icon: customIcon}).addTo(startLayerGroup);
        startCoords = coordinates;
        currentStep = "end";
      } else {
        L.marker(e.latlng, {icon: customIcon}).addTo(endLayerGroup);
        endCoords = coordinates;

        currentStep = "start";
      }

      if (startCoords && endCoords){
        const url = "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve?returnPolygonBarriers=true&outSR=4326&f=json&polygonBarriers=%7B%22features%22%3A%5B%7B%22geometry%22%3A%7B%22rings%22%3A%5B%5B%5B-96.382%2C42.49%5D%2C%5B-96.391%2C42.471%5D%2C%5B-96.414%2C42.475%5D%2C%5B-96.421%2C42.491%5D%2C%5B-96.401%2C42.505%5D%2C%5B-96.382%2C42.49%5D%5D%5D%7D%2C%22attributes%22%3A%7B%22Name%22%3A%22Flood%20zone%22%2C%22BarrierType%22%3A0%7D%7D%5D%7D&token=AAPK3c3f7569a5364ebf989232a728f5cbbbD0PGCXGZqbFvXv3e1oUb76gUENrlq1_yhMDPKhunJRKWbLKb2OdXPodGKWPO3UkL&stops=-96.436378,42.499344;-96.364166,42.459969&startTime=now&returnDirections=true"
        updateRoute(url);
      }
    });


    return () => {
      map.off("click")
      map.remove();
    };
  }, []);


  return (
    
    <div id="map" className={`flex md:flex-row flex-col w-[1000px] h-[800px] justify-center`}></div>
  );
};

export default MapLeaf;