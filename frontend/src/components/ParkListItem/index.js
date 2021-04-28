import { useEffect, useRef } from 'react'
import ParkData from '../ParkData'
import Button from '../Button'

const ParkListItem = ({ place_id, name, formattedAddress, phone, website, currentUser, selected }) => {
  const parkDiv = useRef(null)

  useEffect(() => {
    if (parkDiv.current && selected) {
      parkDiv.current.scrollIntoView({ 
        behavior: 'smooth', 
      })
    }
  }, [selected, parkDiv])

  return (
    <div id={place_id} ref={parkDiv}>
      <ParkData
        name={name}
        formattedAddress={formattedAddress}
        phone={phone}
        website={website}
      />
      <Button place_id={place_id} currentUser={currentUser} />
    </div>
  )
}

export default ParkListItem