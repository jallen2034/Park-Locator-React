import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import * as L from "leaflet";
import React from 'react'

/* helper to set the users selected park/marker 
 * also changes our state for our map center to center to the new marker that was clicked on */
const markerClick = function (event, place_id, setClickedPark, setMapCenter, mapCenter, location_lat, location_long, setClickedParkInList) {
  setClickedPark(place_id)
  setClickedParkInList('')
  setMapCenter([location_lat, location_long])
}

// https://stackoverflow.com/questions/64665827/react-leaflet-center-attribute-does-not-change-when-the-center-state-changes
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

/* https://react-leaflet.js.org/docs/start-introduction
 * https://codewithwolf.com/how-to-change-marker-color-react-leaflet
 * https://github.com/PaulLeCam/react-leaflet/issues/453
 * https://stackoverflow.com/questions/40901539/arbitrary-function-on-react-leaflet-marker-click
 * https://react-leaflet.js.org/docs/api-map */
const MapDisplay = ({ parksForMap, setClickedPark, clickedPark, mapCenter, setMapCenter, clickedParkInList, setClickedParkInList }) => {
  //  Create the Icon
  const LeafIcon = L.Icon.extend({
    options: {}
  });
  const blueIcon = new LeafIcon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png"
  })
  const redIcon = new LeafIcon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png"
  })
  let listOfMarkers

  // map through and render markers and also conditonally set the clicked icon to red
  if (parksForMap.length > 0) {
    listOfMarkers = parksForMap.map(({ place_id, location_lat, location_long }) => {

      return (
        <Marker
          place_id={place_id}
          icon={place_id === clickedPark || place_id === clickedParkInList ? redIcon : blueIcon}
          position={[location_lat, location_long]}
          eventHandlers={{
            click: (event) => {
              markerClick(event, place_id, setClickedPark, setMapCenter, mapCenter, location_lat, location_long, setClickedParkInList)
            },
          }}
        >
        </Marker>
      )
    })
  }

  return (
    <MapContainer
      center={mapCenter}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '100vh', width: '70vw', marginLeft: '0px', overflow: 'hidden' }}
    >
      <ChangeView center={mapCenter} zoom={13} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=lVUjykFYNWAQcw6IhXoj"
      />
      {listOfMarkers}
    </MapContainer>
  )
}

export default MapDisplay
