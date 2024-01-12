import React from "react";
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup,useMap } from "react-leaflet";

const MapLeaf = () => {
  return (
    <MapContainer center={[51, -114]} zoom={13} scrollWheelZoom={false} className={`flex md:flex-row flex-col w-[1000px] h-[800px] justify-center`}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51, -114]}>
      </Marker>
    </MapContainer>
  );
};

export default MapLeaf;
