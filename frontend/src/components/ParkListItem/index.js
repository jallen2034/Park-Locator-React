import React from 'react'
import ParkData from '../ParkData'
import Button from '../Button'

const ParkListItem = ({name, formattedAddress, phone, website}) => {
  return (
    <div>
      <ParkData
        name={name}
        formattedAddress={formattedAddress}
        phone={phone}
        website={website}
      />
      <Button/>
    </div>
  )
}

export default ParkListItem
