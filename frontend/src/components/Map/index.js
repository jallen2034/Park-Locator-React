import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import React from 'react'
import 'leaflet/dist/leaflet.css';

// https://react-leaflet.js.org/docs/start-introduction

// 49.2827° N, 123.1207° W
const MapDisplay = () => {
  return (
    <MapContainer center={[49.282, -123.120]} zoom={13} scrollWheelZoom={false} style={{ height: '100vh', width: '85vw', marginLeft: '20px' }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[49.282, -123.120]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default MapDisplay
