import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ParkListItem from '../ParkListItem'

// loop through array of data and create a parklistitem with prop info for each park
const ParkList = ({ parksForMap }) => {
  let listOfParks

  if (parksForMap.length > 0) {
    listOfParks = parksForMap.map(({ name, formatted_address, phone, website }) => {
      return (
        <ParkListItem
          name={name}
          formattedAddress={formatted_address}
          phone={phone}
          website={website}
        />
      )
    })
  }

  return (
    <div>
      {listOfParks}
    </div>
  )
}

export default ParkList