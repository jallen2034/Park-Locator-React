import React from 'react'
import ParkData from '../ParkData'
import UserSavedParksButton from '../Button/index.2'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    maxWidth: '65%',
    minWidth: '61%',
    margin: '20px',
    borderRadius: 10,
    "&:hover": {
      backgroundColor: "#f8f8f8"
    }
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  flexTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: '20%',
    marginTop: '10px'
  },
  h4: {
    fontSize: '24px',
    marginRight: '35px',
    marginTop: '35px',
    marginBottom: '15px',
    textAlign: 'center'
  }
});

const UserSavedParks = ({ usersSavedParks, currentUser, setUsersSavedParks, setClickedPark, setMapCenter, setClickedParkInList }) => {
  let savedParks
  const classes = useStyles()

  if (usersSavedParks.length > 0) {
    savedParks = usersSavedParks.map(({ place_id, name, formattedAddress, phone, website }) => {
      return (
        <div id="test" className={classes.flex}>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <ParkData
                name={name}
                formattedAddress={formattedAddress}
                phone={phone}
                website={website}
              />
              <UserSavedParksButton
                currentUser={currentUser}
                place_id={place_id}
                setUsersSavedParks={setUsersSavedParks}
                setClickedPark={setClickedPark}
                setMapCenter={setMapCenter}
                setClickedParkInList={setClickedParkInList}
              />
            </CardContent>
          </Card>
        </div>
      )
    })
  }

  // TODO - fix this so it renders correctly with a loading spinner
  if (savedParks) {
    return (
      <>
        <div className={classes.flexTitle}>
          <Typography variant='h4' className={classes.h4}>
            My Saved Parks
          </Typography>
        </div>
        <div>
          {savedParks}
        </div>
      </>
    )
  } else {
    return (
      <div>
        <Typography variant='h4' className={classes.h4}>
          No Skateparks favourited! Add some parks in here!
        </Typography>
      </div>
    )
  }
}

export default UserSavedParks