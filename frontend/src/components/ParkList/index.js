import React from 'react'
import ParkListItem from '../ParkListItem'

// make fake data here for testing
const data = [
  {
    name: "Strathcona Park",
    formattedAddress: "1234 Skate Park Drive",
    phone: "778-1223-545",
    website: "https://skatepark.ca"
  },
  {
    name: "Stanley Skatepark",
    formattedAddress: "1110 Bidwell St",
    phone: "778-1233-935",
    website: "https://stanleyskatepark.ca"
  },
  {
    name: "Surrey SkatePark",
    formattedAddress: "3 Davie Street",
    phone: "604-1299-645",
    website: "https://surreyskatepark.ca"
  }
]

// loop through array of data and create a parklistitem with prop info for each park
const ParkList = () => {
  const listOfParks = data.map(({ name, formattedAddress, phone, website }) => {
  return (
    <ParkListItem
      name={name}
      formattedAddress={formattedAddress}
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