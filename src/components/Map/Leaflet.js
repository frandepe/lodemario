import React from "react";
import { Map, TileLayer } from "react-leaflet";
import "./leaflet.scss";
import "leaflet/dist/leaflet.css";
import Markers from "./Markers";

const Leaflet = () => {
  return (
    <Map center={[-34.949742, -57.973353]} zoom={16} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Markers />
    </Map>
  );
};

export default Leaflet;
