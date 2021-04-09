import React from 'react'
import Button from '@material-ui/core/Button'

const UserSavedParksButton = () => {
  return (
    <div>
       <Button variant="contained" color="secondary" disableElevation>
         Remove From Saved Parks
       </Button>
       <Button variant="contained" color="default" disableElevation>
         Reviews
       </Button>
       <Button variant="contained" color="primary" disableElevation>
         Go to on Map
       </Button>
    </div>
  )
}

export default UserSavedParksButton