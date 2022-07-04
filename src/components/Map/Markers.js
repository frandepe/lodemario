import React from "react";
import { Marker, Popup } from "react-leaflet";
import iconLocation from "./IconLocation";

const Markers = () => {
  return (
    <Marker position={[-34.949742, -57.973353]} icon={iconLocation}>
      <Popup>Acá estamos ubicados</Popup>
    </Marker>
  );
};

export default Markers;
