import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L, { map, polyline } from "leaflet";
import { Icon } from "leaflet";
import {
  FaArrowRight,
  FaArrowLeft,
  FaArrowUp,
} from "react-icons/fa";
import { ApiKeyManager } from "@esri/arcgis-rest-request";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import {BsFillRecordCircleFill} from "react-icons/bs";


const customIconStart = new Icon({
  iconUrl: "green_marker.svg",
  iconSize: [38, 38],
});

const customIconEnd = new Icon({
  iconUrl: "red_marker.svg",
  iconSize: [38, 38],
});

const customIconBuffer = new Icon({
  iconUrl: "black_marker.svg",
  iconSize: [38, 38],
});

let startCoords, endCoords;
let centerState = false;
let center = [];
let topLeftPoint;
let topRightPoint;
let bottomLeftPoint;
let bottomRightPoint;

const MapLeaf = () => {
  const [direcArr, setDirecArr] = useState([]);
  const [time, setTime] = useState(0);
  const [dist, setDist] = useState(0);

  const [radiusClicked, setRadiusClicked] = useState(false);
  const handleRadiusClick = () => {
    setRadiusClicked(current => !current)
    centerState = !centerState

    console.log(radiusClicked)
  }

  useEffect(() => {
    // Create the map
    const map = L.map("map", { minZoom: 2 }).setView(
      [51.14215, -114.23333],
      13
    );

    // Add basemap
    const apiKey =
      "AAPK3c3f7569a5364ebf989232a728f5cbbbD0PGCXGZqbFvXv3e1oUb76gUENrlq1_yhMDPKhunJRKWbLKb2OdXPodGKWPO3UkL";
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/ypaul/clrbbh2e4002d01re65us9mvk/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoieXBhdWwiLCJhIjoiY2xyYjV5eHZqMGtxajJpcnN4Zm1kOGU4YSJ9.nkPc81nO8sFFfAEin7TN1w",
      {
        attribution: "© OpenStreetMap contributors",
      }
    ).addTo(map);
    
    let currentStep = "start";
   
    let geocode1 = L.Control.geocoder({
      collapsed: false,
      position: "topleft",
      placeholder: "Choose Starting Point...",
      defaultMarkGeocode: false,
    }).addTo(map);

    let geocode2 = L.Control.geocoder({
      collapsed: false,
      position: "topleft",
      placeholder: "Choose Destination Point...",
      defaultMarkGeocode: false,
    }).addTo(map);

    const startLayerGroup = L.layerGroup().addTo(map);

    
    // Real-time Geolocation 
    if(!navigator.geolocation){
      console.log("browser doesn't support geolocation feature")
    }
    else{
      navigator.geolocation.getCurrentPosition(getPosition)  //call back function
    }

    function getPosition(position){
      console.log(position)
      var moveLat = position.coords.latitude
      var moveLon = position.coords.longitude
      var accuracy = position.coords.accuracy
    }

    const updateRoute = async (url) => {
      const authentication = ApiKeyManager.fromKey(apiKey);
      console.log("radius")
      console.log(radiusClicked)

      //Buffer Radius
      try {
        const response = await fetch(url);

        if (!response.ok) {
          // Assuming the API returns an error message in the response body
          const errorData = await response.json();
          const errorMessage = errorData.message || response.statusText;
          throw new Error(`API error: ${errorMessage}`);
        }
        const ResponseData = await response.json();
        console.log("response data:");
        console.log(ResponseData);

        let polylineSymbol = {
          type: "simple-line", // autocasts as SimpleLineSymbol()
          color: [226, 119, 40],
          width: 4,
        };
        if (
          ResponseData.routes &&
          ResponseData.routes.features &&
          ResponseData.routes.features.length > 0
        ) {
          var coords = ResponseData.routes.features[0].geometry.paths[0];
          let directions = ResponseData.directions[0].features;
          setDirecArr((prevDirecArr) => [
            ...prevDirecArr,
            ...directions.map((direction) => direction.attributes.text),
          ]);

          setTime(Math.floor(ResponseData.directions[0].summary.totalDriveTime)+1);
          setDist(((ResponseData.directions[0].summary.totalLength)*1.6).toFixed(1))

          console.log("direction array");
          console.log(direcArr);
        } else {
          console.error("No route data available in the response.");
        }

        for (let i = 0; i < coords.length; i++) {
          const temp = coords[i][0];
          coords[i][0] = coords[i][1];
          coords[i][1] = temp;
        }

        if (center.length !== 0){
          var polycoords =
          ResponseData.polygonBarriers.features[0].geometry.rings[0];

          for (let i = 0; i < polycoords.length; i++) {
            const temp = polycoords[i][0];
            polycoords[i][0] = polycoords[i][1];
            polycoords[i][1] = temp;
          }

          console.log("polycoords")
          console.log(polycoords)

          L.polygon(polycoords, { color: "red" }).addTo(map);
        }

        let polyline = L.polyline(coords, { color: "blue" }).addTo(map);
        startLayerGroup.addLayer(polyline);

        startCoords = null;
        endCoords = null;
      } catch (error) {
        console.error(error);
        alert(
          "There was a problem using the route service. See the console for details."
        );
      }
    };

    geocode1.on("markgeocode", function (e) {
      startLayerGroup.clearLayers();

      var latlng = e.geocode.center; 
      startCoords = [latlng.lng, latlng.lat];

      var customMarkerStart = L.marker(latlng, {
        icon: L.icon({
          iconUrl: 'green_marker.svg',
          iconSize: [38, 38], 
          iconAnchor: [12, 41], 
          popupAnchor: [1, -34] 
        })
      });

      startLayerGroup.addLayer(customMarkerStart);
      if (startCoords && endCoords) {
        const url = `https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve?returnPolygonBarriers=true&outSR=4326&f=json&polygonBarriers=%7B%22features%22%3A%5B%7B%22geometry%22%3A%7B%22rings%22%3A%5B%5B%5B${topLeftPoint[0]}%2C${topLeftPoint[1]}%5D%2C%5B${topRightPoint[0]}%2C${topRightPoint[1]}%5D%2C%5B${bottomRightPoint[0]}%2C${bottomRightPoint[1]}%5D%2C%5B${bottomLeftPoint[0]}%2C${bottomLeftPoint[1]}%5D%5D%5D%7D%2C%22attributes%22%3A%7B%22Name%22%3A%22Flood%20zone%22%2C%22BarrierType%22%3A0%7D%7D%5D%7D&token=AAPK3c3f7569a5364ebf989232a728f5cbbbD0PGCXGZqbFvXv3e1oUb76gUENrlq1_yhMDPKhunJRKWbLKb2OdXPodGKWPO3UkL&stops=${startCoords[0]},${startCoords[1]};${endCoords[0]},${endCoords[1]}&startTime=now&returnDirections=true`;
        updateRoute(url);
        console.log(`Start Coords: ${startCoords}`);
      }
    });

    geocode2.on("markgeocode", function (e) {
      var latlng = e.geocode.center; 
      endCoords = [latlng.lng, latlng.lat];

      var customMarkerEnd = L.marker(latlng, {
        icon: L.icon({
          iconUrl: 'red_marker.svg',
          iconSize: [38, 38],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34] 
        })
      });

      startLayerGroup.addLayer(customMarkerEnd);
      if (startCoords && endCoords) {
        const url = `https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve?returnPolygonBarriers=true&outSR=4326&f=json&polygonBarriers=%7B%22features%22%3A%5B%7B%22geometry%22%3A%7B%22rings%22%3A%5B%5B%5B${topLeftPoint[0]}%2C${topLeftPoint[1]}%5D%2C%5B${topRightPoint[0]}%2C${topRightPoint[1]}%5D%2C%5B${bottomRightPoint[0]}%2C${bottomRightPoint[1]}%5D%2C%5B${bottomLeftPoint[0]}%2C${bottomLeftPoint[1]}%5D%5D%5D%7D%2C%22attributes%22%3A%7B%22Name%22%3A%22Flood%20zone%22%2C%22BarrierType%22%3A0%7D%7D%5D%7D&token=AAPK3c3f7569a5364ebf989232a728f5cbbbD0PGCXGZqbFvXv3e1oUb76gUENrlq1_yhMDPKhunJRKWbLKb2OdXPodGKWPO3UkL&stops=${startCoords[0]},${startCoords[1]};${endCoords[0]},${endCoords[1]}&startTime=now&returnDirections=true`;
        updateRoute(url);
        console.log(`Start Coords: ${startCoords}`);
        console.log(`end Coords: ${endCoords}`);
      }
    });

    map.on("click", (e) => {
      const coordinates = [e.latlng.lng, e.latlng.lat];

      if (currentStep === "start" && centerState == false) {
        console.log("at start");
        startLayerGroup.clearLayers();
        setDirecArr([]);

        let marker1 = L.marker(e.latlng, { icon: customIconStart });
        startLayerGroup.addLayer(marker1);
        startCoords = coordinates;
        let startLat = startCoords[1];
        let startLon = startCoords[0];
        currentStep = "end";
      } else if (currentStep === "end" && centerState == false) {
        let marker2 = L.marker(e.latlng, { icon: customIconEnd });
        startLayerGroup.addLayer(marker2);
        endCoords = coordinates;
        let endLat = endCoords[1];
        let endLon = endCoords[0];

        currentStep = "start";
      }
      else{
        let marker3 = L.marker(e.latlng, {icon: customIconBuffer});
        startLayerGroup.addLayer(marker3);
        center = coordinates;
        console.log(center);

      }
      
      if (startCoords && endCoords && center.length !== 0) {
        console.log("center i if statement"+center);
        console.log(bottomLeftPoint, bottomRightPoint, topLeftPoint, topRightPoint);
        let radius = 1; //in km
        topLeftPoint = [center[0] - radius / 110, center[1] - radius / 110];
        topRightPoint = [center[0] + radius / 110, center[1] - radius / 110];
        bottomLeftPoint = [
          center[0] - radius / 110,
          center[1] + radius / 110,
        ];
        bottomRightPoint = [
          center[0] + radius / 110,
          center[1] + radius / 110,
        ];

        //round to 3 decimal places
        topLeftPoint = [topLeftPoint[0].toFixed(3), topLeftPoint[1].toFixed(3)];
        topRightPoint = [topRightPoint[0].toFixed(3), topRightPoint[1].toFixed(3)];
        bottomLeftPoint = [
          bottomLeftPoint[0].toFixed(3),
          bottomLeftPoint[1].toFixed(3),
        ];
        bottomRightPoint = [
          bottomRightPoint[0].toFixed(3),
          bottomRightPoint[1].toFixed(3),
        ];
        
        const url = `https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve?returnPolygonBarriers=true&outSR=4326&f=json&polygonBarriers=%7B%22features%22%3A%5B%7B%22geometry%22%3A%7B%22rings%22%3A%5B%5B%5B${topLeftPoint[0]}%2C${topLeftPoint[1]}%5D%2C%5B${topRightPoint[0]}%2C${topRightPoint[1]}%5D%2C%5B${bottomRightPoint[0]}%2C${bottomRightPoint[1]}%5D%2C%5B${bottomLeftPoint[0]}%2C${bottomLeftPoint[1]}%5D%5D%5D%7D%2C%22attributes%22%3A%7B%22Name%22%3A%22Flood%20zone%22%2C%22BarrierType%22%3A0%7D%7D%5D%7D&token=AAPK3c3f7569a5364ebf989232a728f5cbbbD0PGCXGZqbFvXv3e1oUb76gUENrlq1_yhMDPKhunJRKWbLKb2OdXPodGKWPO3UkL&stops=${startCoords[0]},${startCoords[1]};${endCoords[0]},${endCoords[1]}&startTime=now&returnDirections=true`;
        updateRoute(url);
      }
      else if (startCoords && endCoords) {
        const url = `https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve?returnPolygonBarriers=false&outSR=4326&f=json&token=AAPK3c3f7569a5364ebf989232a728f5cbbbD0PGCXGZqbFvXv3e1oUb76gUENrlq1_yhMDPKhunJRKWbLKb2OdXPodGKWPO3UkL&stops=${startCoords[0]},${startCoords[1]};${endCoords[0]},${endCoords[1]}&startTime=now&returnDirections=true`;
        updateRoute(url);
      }
    });

    return () => {
      map.off("click");
      map.remove();
    };
  }, [map]);

  return (
    <>
      <div
        id="map"
        className={`flex md:flex-row flex-col w-[1000px] h-screen justify-center z-0`}
      ></div>
      <div className={`flex flex-col items-center justify-start relative w-[400px] top-30 right-80 z-20 ${direcArr.length === 0 ? "hidden" : ""}`}>
        <div
          className={`flex flex-col overflow-auto h-[500px] bg-white border-white opacity-70 rounded-xl $`}
        >
          {direcArr.map((directionText, index) => (
            <div
              key={index}
              className=" text-black text-opacity-100 font-bold flex flex-row"
            >
              {directionText.toLowerCase().includes("right") && (
                <FaArrowRight className="mr-2" />
              )}
              {directionText.toLowerCase().includes("left") && (
                <FaArrowLeft className="mr-2" />
              )}
              {!directionText.toLowerCase().includes("right") &&
                !directionText.toLowerCase().includes("left") && (
                  <FaArrowUp className="mr-2" />
                )}
              {directionText}
            </div>
          ))}
        </div>
        <div className={`flex flex-col overflow-auto h-[50px] w-[400px] bg-white border-white opacity-70 rounded-xl mt-5`}>
          <div className="text-black font-bold">
              Total Time: {time} min
          </div>
          <div className="text-black font-bold">
              Total Distance: {dist} km
          </div>
        </div>
        <div>
          <button className="text-primary w-[150px] h-[50px] duration-500 bg-white hover:bg-secondary hover:text-white rounded-full hover:bg-gr my-6 mx-auto">Start Routing</button>
        </div>
      </div>
      <div className = {`flex flex-col absolute top-[20%] z-20`}>
        <button onClick={handleRadiusClick}><SideBarIcon Icon={<BsFillRecordCircleFill size="28" />} text="Radius"></SideBarIcon></button>
      </div>
      
    </>
  );
};

const SideBarIcon = ({ Icon, text = 'words'}) => (
  <div className = "sb-icons group">
      {Icon}
      <span className="sb-words group-hover:scale-100">
          {text}
      </span>
  </div>
  //<button><SideBarIcon Icon={<BsGlobe size="28"/>} text="Coordinates" ></SideBarIcon></button>
  //<button><SideBarIcon Icon={<TbShape3 size="28"/>} text="Polyline"></SideBarIcon></button>

)

export default MapLeaf;
