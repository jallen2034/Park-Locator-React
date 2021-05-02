import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  h5: {
    fontSize: '18px',
    fontWeight: 'bold'
  },
  h6: {
    fontSize: '16px',
    marginTop: '5px'
  }
}))

const ParkData = ({name, formattedAddress, phone, website}) => {
  const classes = useStyles()
  return (
    <div>
      <div>
        <Typography variant='h5' className={classes.h5}>
          {name}
        </Typography>
      </div>
      <div>
        <Typography variant='h6' className={classes.h6}>
          {formattedAddress}
        </Typography>
      </div>
      <div>
        <Typography variant='h6' className={classes.h6}>
          {phone}
        </Typography>
      </div>
      <div>
        <Typography variant='h6' className={classes.h6}>
          <a href={website} target="_blank">{website}</a>
        </Typography>
      </div>
    </div>
  )
}

export default ParkData
