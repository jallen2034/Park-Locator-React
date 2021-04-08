import React from 'react'
import Button from '@material-ui/core/Button'

const MyParksButton = () => {
  return (
    <div>
       <Button variant="contained" color="primary" disableElevation>
         Add to my parks
       </Button>
       <Button variant="contained" color="default" disableElevation>
         Reviews
       </Button>
    </div>
  )
}

export default MyParksButton
