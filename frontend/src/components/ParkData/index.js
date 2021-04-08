import React from 'react'

const ParkData = ({name, formattedAddress, phone, website}) => {
  return (
    <div>
      <div>
        {name}
      </div>
      <div>
        {formattedAddress}
      </div>
      <div>
        {phone}
      </div>
      <div>
        {website}
      </div>
    </div>
  )
}

export default ParkData
