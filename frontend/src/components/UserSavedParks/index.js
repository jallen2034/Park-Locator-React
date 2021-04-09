import React from 'react'
import ParkData from '../ParkData'
import UserSavedParksButton from '../Button/index.2'

// mock data/axios request for a users saved parks
const data = [
  {
    name: "Hillside Park",
    formattedAddress: "184 Hill Park Drive",
    phone: "728-1323-115",
    website: "https://skateparkhill.ca"
  },
  {
    name: "Stanley Bowl",
    formattedAddress: "1190 Bowl St",
    phone: "778-1213-975",
    website: "https://stanleybowl.ca"
  },
  {
    name: "Metrotown StreetPark",
    formattedAddress: "3 StreetPark Road",
    phone: "604-1199-115",
    website: "https://metrotownstreetpark.ca"
  }
]

const UserSavedParks = () => {
  const savedParks = data.map(({name, formattedAddress, phone, website}) => {
    return (
      <div>
        <ParkData
          name={name}
          formattedAddress={formattedAddress}
          phone={phone}
          website={website}
        />
        <UserSavedParksButton />
      </div>
    )
  })
  return (
    <div>
      {savedParks}
    </div>
  )
}

export default UserSavedParks
