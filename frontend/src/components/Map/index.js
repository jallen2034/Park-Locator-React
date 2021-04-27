import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import React from 'react'

// https://react-leaflet.js.org/docs/start-introduction
// https://github.com/PaulLeCam/react-leaflet/issues/453
// 49.2827° N, 123.1207° W
const MapDisplay = ({ parksForMap }) => {
  console.log("parksForMap in MapDisplay component: ", parksForMap)
  let listOfMarkers

  if (parksForMap.length > 0) {
    listOfMarkers = parksForMap.map(({ place_id, location_lat, location_long }) => {
      return (
        <Marker place_id={place_id} position={[location_lat, location_long]}>
        </Marker>
      )
    })
  }

  console.log("listOfMarkers filled: ", listOfMarkers)

  return (
    <MapContainer center={[49.282, -123.120]} zoom={13} scrollWheelZoom={false} style={{ height: '100vh', width: '70vw', marginLeft: '0px' }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {listOfMarkers}
    </MapContainer>
  )
}

export default MapDisplay
