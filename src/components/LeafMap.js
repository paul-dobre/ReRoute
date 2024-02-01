import L from 'leaflet';
import {Icon} from "leaflet"
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import * as turf from '@turf/turf'
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'; // Add this line
import { Geocoder } from 'leaflet-control-geocoder'; // Add this line

export const createMap = (mapID) => {
    var map = L.map(mapID, { minZoom: 2 }).setView([51.14215,-114.233330], 13);
    const startLayerGroup = L.layerGroup().addTo(map);
   
    let currentStep = "start";
    let startCoords, endCoords;
    let routeControl = null;

    L.tileLayer("https://api.mapbox.com/styles/v1/ypaul/clrbbh2e4002d01re65us9mvk/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoieXBhdWwiLCJhIjoiY2xyYjV5eHZqMGtxajJpcnN4Zm1kOGU4YSJ9.nkPc81nO8sFFfAEin7TN1w", {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    let center = map.getCenter();
    let marker1 = L.marker(center);

     //Buffer Radius
     let radius = 1.5; //in km
     let topLeftPoint = [center.lng-(radius/110), center.lat-(radius/110)];
     let topRightPoint = [center.lng+(radius/110), center.lat-(radius/110)];
     let bottomLeftPoint = [center.lng-(radius/110), center.lat+(radius/110)];
     let bottomRightPoint = [center.lng+(radius/110), center.lat+(radius/110)];

     //round to 3 decimal places
     topLeftPoint = [topLeftPoint[0].toFixed(3), topLeftPoint[1].toFixed(3)];
     topRightPoint = [topRightPoint[0].toFixed(3), topRightPoint[1].toFixed(3)];
     bottomLeftPoint = [bottomLeftPoint[0].toFixed(3), bottomLeftPoint[1].toFixed(3)];
     bottomRightPoint = [bottomRightPoint[0].toFixed(3), bottomRightPoint[1].toFixed(3)];

    map.on("click", (e) => {

        if(currentStep === 'start'){
            
            var point = turf.point([-114, 51]);
            var buffered = turf.buffer(point, 5, {units: 'kilometers'});

            var geoJsonBuffer = L.geoJSON(buffered, {
                style: function (feature) {
                    return {color: "red", weight: 2};
                }
            }).addTo(map);

            // startLayerGroup.addLayer(marker1);
            
            var start = [-114.233330, 51.14215];
            var end = [e.latlng.lng, e.latlng.lat];
            var options = {
            obstacles: buffered
            };
        
            var path = turf.shortestPath(start, end, options);
            console.log("Path");
            let shortPathCoords = path.geometry.coordinates;

            var latLngs = shortPathCoords.map(function(coord) {
              return L.latLng([coord[1], coord[0]]);
          });

          let polyline = L.polyline(latLngs, {color: 'blue'}).addTo(map);
          console.log(latLngs);

            console.log(`buffered: ${buffered}`)
            console.log(buffered);
            routeControl = L.Routing.control({
                waypoints: [
                    L.latLng(51.14215, -114.233330),
                    L.latLng(e.latlng.lat, e.latlng.lng)
                ],
                lineOptions: {
                    styles: [{color: 'blue', opacity: 1, weight: 5}]
                  },
                geocoder: new Geocoder.nominatim(),
                routeWhileDragging: true
            }).addTo(map);
            currentStep = 'end';
            
            console.log("routing");
            console.log(routeControl.getPlan());
        }
        else{
            map.removeLayer(startLayerGroup);
            map.removeControl(routeControl);
            currentStep = 'start';
        }
        
        
    });

   

    return map;
}

