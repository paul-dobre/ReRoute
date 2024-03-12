import React, { useEffect, useState } from "react";
import ReactDOMServer from 'react-dom/server';
import "leaflet/dist/leaflet.css";
import L, { map, polyline} from "leaflet";
import { Icon } from "leaflet";
import { ApiKeyManager } from "@esri/arcgis-rest-request";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import { BsPlusCircle, BsFillFileEarmarkTextFill, BsPencilSquare, BsTools, BsGlobe, BsArrowCounterclockwise, BsFillRecordCircleFill} from "react-icons/bs";
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css'; 
import 'leaflet/dist/leaflet.css';
import 'leaflet.polyline.snakeanim'; 


const iconGreen = ReactDOMServer.renderToString(<FontAwesomeIcon icon={faLocationDot} style={{ color: 'green', fontSize: '30'}} className= 'fa-bounce' />)
const iconRed = ReactDOMServer.renderToString(<FontAwesomeIcon icon={faLocationDot} style={{ color: 'red', fontSize: '30' }} className='fa-bounce' />)

const customIconStart = L.divIcon({
  html: iconGreen, className: 'dummy', iconSize: [45, 45]
});

const customIconEnd = L.divIcon({
  html: iconRed, className: 'dummy'
});

const customIconBuffer = new Icon({
  iconUrl: "orange.svg",
  iconSize: [38, 38],
});

// Global Variables --------------------------------------------------------
let startCoords, endCoords;
let centerState = false;
let center = [];
let topLeftPoint;
let topRightPoint;
let bottomLeftPoint;
let bottomRightPoint;
let encode_string = '';
let count = 1;
let realLat;
let realLng;

const MapLeaf = () => {
  const [direcArr, setDirecArr] = useState([]);
  const [time, setTime] = useState(0);
  const [dist, setDist] = useState(0);
  const[showDirections, setShowDirections] = useState(false);
  let previousPolyline = null; 

  const [radiusClicked, setRadiusClicked] = useState(false);
  const handleRadiusClick = () => {
    setRadiusClicked(current => !current)
    centerState = !centerState

    console.log(radiusClicked)
  }

  useEffect(() => {
    // Create the map
    const map = L.map("map", { minZoom: 2 }).setView(
      [51, -114],
      13
    );
    // let realMarker = L.marker([realLat,realLng]);

     // Real-time Geolocation -----------------------------------------------------------------
    if(!navigator.geolocation){
      console.log("browser doesn't support geolocation feature")
    }
    else{
      navigator.geolocation.getCurrentPosition(getPosition)  //call back function
    }

    function getPosition(position){
      console.log(position)
      realLat = position.coords.latitude
      realLng = position.coords.longitude
      var accuracy = position.coords.accuracy
  
      updateMapView(realLat,realLng)
    }
  
    function updateMapView(lat,lng){
      map.flyTo(
        [lat,lng],
        13
      );
      L.marker([lat,lng]).addTo(map)
    }

    // Add basemap
    const apiKey =
      "AAPK3c3f7569a5364ebf989232a728f5cbbbD0PGCXGZqbFvXv3e1oUb76gUENrlq1_yhMDPKhunJRKWbLKb2OdXPodGKWPO3UkL";
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/ypaul/cltmfdyza016o01pta45m7rrf/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoieXBhdWwiLCJhIjoiY2xyYjV5eHZqMGtxajJpcnN4Zm1kOGU4YSJ9.nkPc81nO8sFFfAEin7TN1w",
      {
        attribution: "© OpenStreetMap contributors",
      }
    ).addTo(map);
    
    // var featureGroup = L.featureGroup([realMarker]).addTo(map)
    
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

    const updateRoute = async (url) => {
      const authentication = ApiKeyManager.fromKey(apiKey);
      console.log("radius")
      console.log(radiusClicked)

    
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
        }


        if (previousPolyline) {
           map.removeLayer(previousPolyline); // Remove the old polyline
        }
      

        let polyline = L.polyline(coords, { 
          color: "blue", 
          weight: 5,
          opacity: 1, 
        }).addTo(map);
        
        const timeDur = 1;

        let routeBounds = polyline.getBounds(); 
        
        map.flyToBounds(routeBounds, { 
          duration: timeDur, 
          padding: [50, 50]
        });  

        setTimeout(() => {
          polyline.snakeIn({duration: timeDur});
      }, 1000);
      
        previousPolyline = polyline;

        startCoords = null;
        endCoords = null;
      } catch (error) {
        console.error(error);
        alert(
          "There was a problem using the route service. See the console for details."
        );
      }
    };

    //Geocoding -----------------------------------------------------------------
    geocode1.on("markgeocode", function (e) {
      startLayerGroup.clearLayers();

      if (previousPolyline) {
        map.removeLayer(previousPolyline); 
     }

      var latlng = e.geocode.center; 
      startCoords = [latlng.lng, latlng.lat];

      var customMarkerStart = L.marker(latlng, {icon: customIconStart , className: 'dummy'});

      startLayerGroup.addLayer(customMarkerStart);
    });

    geocode2.on("markgeocode", function (e) {
      var latlng = e.geocode.center; 
      endCoords = [latlng.lng, latlng.lat];

      var customMarkerEnd = L.marker(latlng, {icon: customIconEnd , className: 'dummy'});

      startLayerGroup.addLayer(customMarkerEnd);
      if (startCoords && endCoords && center.length !== 0) {
        const url = `https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve?returnPolygonBarriers=true&outSR=4326&f=json&polygonBarriers=%7B%22features%22%3A%5B${encode_string}%5D%7D&token=AAPK3c3f7569a5364ebf989232a728f5cbbbD0PGCXGZqbFvXv3e1oUb76gUENrlq1_yhMDPKhunJRKWbLKb2OdXPodGKWPO3UkL&stops=${startCoords[0]},${startCoords[1]};${endCoords[0]},${endCoords[1]}&startTime=now&returnDirections=true`;
        updateRoute(url);
      }
      else if(startCoords && endCoords){
        const url = `https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve?returnPolygonBarriers=false&outSR=4326&f=json&token=AAPK3c3f7569a5364ebf989232a728f5cbbbD0PGCXGZqbFvXv3e1oUb76gUENrlq1_yhMDPKhunJRKWbLKb2OdXPodGKWPO3UkL&stops=${startCoords[0]},${startCoords[1]};${endCoords[0]},${endCoords[1]}&startTime=now&returnDirections=true`;
        updateRoute(url);
      }
    });
    
    // click on map----------------------------------------------------------
    map.on("click", (e) => {
      const coordinates = [e.latlng.lng, e.latlng.lat];

      if (currentStep === "start" && centerState == false) {
        console.log("at start");
        startLayerGroup.clearLayers();

        if (previousPolyline) {
          map.removeLayer(previousPolyline); // Remove the old polyline
       }

        setDirecArr([]);

        let marker1 = L.marker(e.latlng, { icon: customIconStart , className: 'dummy'});
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
        let marker3 = L.marker(e.latlng, {icon: customIconBuffer, className: 'dummy'}).addTo(map);
        startLayerGroup.addLayer(marker3);
        center = coordinates;
        L.circle([center[1],center[0]], { color: "orange", radius:500 }).addTo(map);
        
        let radius = 0.5; //in km
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
        topRightPoint = [topRightPoint[0].toFixed(3), topRightPoint[1].toFixed(3)];        // %5B%5B<>%2C<>%5D%2C%5B%5B    
        bottomLeftPoint = [
          bottomLeftPoint[0].toFixed(3),
          bottomLeftPoint[1].toFixed(3),
        ];
        bottomRightPoint = [
          bottomRightPoint[0].toFixed(3),
          bottomRightPoint[1].toFixed(3),
        ];

        count += 1;
        if(encode_string != ''){
          encode_string += `%2C%7B%22geometry%22%3A%7B%22rings%22%3A%5B%5B%5B${topLeftPoint[0]}%2C${topLeftPoint[1]}%5D%2C%5B${topRightPoint[0]}%2C${topRightPoint[1]}%5D%2C%5B${bottomRightPoint[0]}%2C${bottomRightPoint[1]}%5D%2C%5B${bottomLeftPoint[0]}%2C${bottomLeftPoint[1]}%5D%5D%5D%7D%2C%22attributes%22%3A%7B%22Name%22%3A%22Flood%20zone${count}%22%2C%22BarrierType%22%3A0%7D%7D`
        }
        else{
          encode_string += `%7B%22geometry%22%3A%7B%22rings%22%3A%5B%5B%5B${topLeftPoint[0]}%2C${topLeftPoint[1]}%5D%2C%5B${topRightPoint[0]}%2C${topRightPoint[1]}%5D%2C%5B${bottomRightPoint[0]}%2C${bottomRightPoint[1]}%5D%2C%5B${bottomLeftPoint[0]}%2C${bottomLeftPoint[1]}%5D%5D%5D%7D%2C%22attributes%22%3A%7B%22Name%22%3A%22Flood%20zone%22%2C%22BarrierType%22%3A0%7D%7D`
        }
      }
      
      if (startCoords && endCoords && center.length !== 0) {
        const url = `https://route-api.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World/solve?returnPolygonBarriers=true&outSR=4326&f=json&polygonBarriers=%7B%22features%22%3A%5B${encode_string}%5D%7D&token=AAPK3c3f7569a5364ebf989232a728f5cbbbD0PGCXGZqbFvXv3e1oUb76gUENrlq1_yhMDPKhunJRKWbLKb2OdXPodGKWPO3UkL&stops=${startCoords[0]},${startCoords[1]};${endCoords[0]},${endCoords[1]}&startTime=now&returnDirections=true`;
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
    <div className="flex w-[800px] md:w-[1060px] lg:w-[1200px] mlg:w-[1500px]">
      {/* Map Container */}
      <div id="map" className="flex md:flex-row flex-col w-[100%] h-screen justify-center z-0" />

      <div className="flex flex-col items-center justify-start absolute top-30 right-[11%] z-20">
        <div className="relative"> {/* Relative container for positioning */}
          <button 
            className="text-primary w-[150px] h-[50px] duration-500 bg-white bg-opacity-40 hover:bg-white hover:bg-opacity-100 rounded-full my-6 mx-auto flex items-center justify-between px-4"
            onClick={() => setShowDirections(!showDirections)}>Show Directions {showDirections ? <FaAngleUp /> : <FaAngleDown />}</button>
          
          <div className={`absolute top-12 right-0 bg-white bg-opacity-75 duration-200 rounded-xl shadow-md overflow-hidden w-[400px] p-4 my-7 ${showDirections ? '' : 'hidden'}`}>
  <div className="max-h-[300px] overflow-y-auto"> {/* Set a maximum height and enable vertical scrolling */}
    <div className="flex flex-col p-4"> 
      {direcArr.map((directionText, index) => (
        <div key={index} className="text-black text-opacity-100 font-bold flex items-center mb-2">
          <div className=" w-10 h-10 items-center justify-center mr-2 p-2">
            {directionText.toLowerCase().includes("right") && (
              <FontAwesomeIcon icon={ faArrowRight } className = "text-primary fa-beat-fade"/>
            )}
            {directionText.toLowerCase().includes("left") && (
              <FontAwesomeIcon icon={ faArrowLeft } className = "text-primary fa-beat-fade"/>
            )}
            {!directionText.toLowerCase().includes("right") && !directionText.toLowerCase().includes("left") && (
              <FontAwesomeIcon icon={ faArrowUp } className = "text-primary fa-beat-fade"/>
            )}
          </div>
          <span>{directionText}</span>
        </div>
      ))}
    </div>
  </div>

            <div className="flex flex-col p-4 mt-5"> 
              <div className="text-black font-bold">Total Time: {time} min</div>
              <div className="text-black font-bold">Total Distance: {dist} km</div>
            </div>

          </div>
        </div>
      </div>
                    
      <div className={`flex flex-col absolute top-48 mlg:top-[16%] z-20`}>
        <button className="text-primary w-[150px] h-[50px] duration-500 bg-white hover:bg-secondary hover:text-white rounded-full hover:bg-gr my-20 mx-auto">Start Routing</button>
      </div>

      <div className={`flex flex-col absolute top-52 mlg:top-[16%] z-20`}>
        <button onClick={handleRadiusClick}><SideBarIcon Icon={<BsFillRecordCircleFill size="28" />} text="Buffer" state={radiusClicked} /></button>
        
      </div>
    </div>
  );
};


const SideBarIcon = ({ Icon, text = 'words',state}) => (
  <div className = {`sb-icons group ${state ? 'sb-active' : ''}`}>
      {Icon}
      <span className="sb-words group-hover:scale-100">
          {text}
      </span>
  </div>
  //<button><SideBarIcon Icon={<BsGlobe size="28"/>} text="Coordinates" ></SideBarIcon></button>
  //<button><SideBarIcon Icon={<TbShape3 size="28"/>} text="Polyline"></SideBarIcon></button>
  //<button><SideBarIcon Icon={<BsArrowCounterclockwise size="28" />} text="Reset"></SideBarIcon></button>

)

export default MapLeaf;



