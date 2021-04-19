import React from 'react'
import ParkListItem from '../ParkListItem'

// loop through array of data and create a parklistitem with prop info for each park
const ParkList = ({ parksForMap }) => {
  const listOfParks = parksForMap.map(({ name, formatted_address, phone, website }) => {
  return (
    <ParkListItem
      name={name}
      formattedAddress={formatted_address}
      phone={phone}
      website={website}
    />
  )
  })
  return (
    <div>
      {listOfParks}
    </div>
  )
}

export default ParkList