import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import React from 'react'

// helper to set the users selected park/marker
const markerClick = function (event, place_id, setClickedPark) {
  console.log("Clicked!")
  setClickedPark(place_id)
}

/* https://react-leaflet.js.org/docs/start-introduction
 * https://github.com/PaulLeCam/react-leaflet/issues/453
 * https://stackoverflow.com/questions/40901539/arbitrary-function-on-react-leaflet-marker-click */
const MapDisplay = ({ parksForMap, setClickedPark, clickedPark }) => {
  let listOfMarkers

  if (parksForMap.length > 0) {
    listOfMarkers = parksForMap.map(({ place_id, location_lat, location_long }) => {
      return (
        <Marker 
          place_id={place_id} 
          position={[location_lat, location_long]}
          eventHandlers={{
            click: (event) => {
              markerClick(event, place_id, setClickedPark)
            },
          }}
        >
        </Marker>
      )
    })
  }

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
