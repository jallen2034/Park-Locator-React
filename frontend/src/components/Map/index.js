import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import React from 'react'

/* helper to set the users selected park/marker 
 * also changes our state for our map center to center to the new marker that was clicked on */
const MarkerClick = function (event, place_id, setClickedPark, setMapCenter, mapCenter, location_lat, location_long) {
  setClickedPark(place_id)
  setMapCenter([location_lat, location_long])
}

// https://stackoverflow.com/questions/64665827/react-leaflet-center-attribute-does-not-change-when-the-center-state-changes
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

/* https://react-leaflet.js.org/docs/start-introduction
 * https://github.com/PaulLeCam/react-leaflet/issues/453
 * https://stackoverflow.com/questions/40901539/arbitrary-function-on-react-leaflet-marker-click
 * https://react-leaflet.js.org/docs/api-map */
const MapDisplay = ({ parksForMap, setClickedPark, clickedPark, mapCenter, setMapCenter }) => {
  let listOfMarkers

  if (parksForMap.length > 0) {

    listOfMarkers = parksForMap.map(({ place_id, location_lat, location_long }) => {
      return (
        <Marker 
          place_id={place_id} 
          position={[location_lat, location_long]}
          eventHandlers={{
            click: (event) => {
              MarkerClick(event, place_id, setClickedPark, setMapCenter, mapCenter, location_lat, location_long)
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
      scrollWheelZoom={false} 
      style={{ height: '100vh', width: '70vw', marginLeft: '0px', overflow: 'hidden'}}
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
