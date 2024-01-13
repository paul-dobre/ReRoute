import React from "react";
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup,useMap } from "react-leaflet";

const MapLeaf = () => {
  const code = "https://api.mapbox.com/styles/v1/ypaul/clrbbh2e4002d01re65us9mvk/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoieXBhdWwiLCJhIjoiY2xyYjV5eHZqMGtxajJpcnN4Zm1kOGU4YSJ9.nkPc81nO8sFFfAEin7TN1w";
  return (
    <MapContainer center={[51, -114]} zoom={13} scrollWheelZoom={false} className={`flex md:flex-row flex-col w-[1000px] h-[800px] justify-center`}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={code}
      />
      <Marker position={[51, -114]}>
      </Marker>
    </MapContainer>
  );
};

export default MapLeaf;
