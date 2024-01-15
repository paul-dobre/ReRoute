import React, {useEffect, useState} from "react";
import "leaflet/dist/leaflet.css"
import L from "leaflet";
import {Icon} from "leaflet"
import * as esri from 'esri-leaflet';
import * as vec from 'esri-leaflet-vector';
import {request} from '@esri/arcgis-rest-request'
import{solveRoute} from '@esri/arcgis-rest-routing'
import { ApiKeyManager } from "@esri/arcgis-rest-request";


const customIcon = new Icon({
  iconUrl: "CustomMarker.svg",
  iconSize: [38,38]
});

const MapLeaf = () => {
  
  useEffect(() => {
    // Create the map
    const map = L.map("map", { minZoom: 2 }).setView([51, -114], 13);

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


    const updateRoute = () => 
    {
      const authentication = ApiKeyManager.fromKey(apiKey);
      solveRoute({
        stops: [startCoords, endCoords],
        endpoint: "https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve",
        authentication
      })
      .then((response) =>{
        routeLines.clearLayers();
        L.geoJSON(response.routes.geoJson).addTo(routeLines);

        const directionsHTML = response.directions[0].features.map((f) => f.attributes.text).join("<br/>");
        directions.innerHTML = directionsHTML;
        startCoords = null;
        endCoords = null;
      })  
      .catch((error) => {
        console.error(error);
        alert("There was a problem using the route service. See the console for details.");
      });
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
        updateRoute();
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
