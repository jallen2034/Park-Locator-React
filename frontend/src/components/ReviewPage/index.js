import Navbar from '../Navbar'
import SignUp from '../SignUp'
import Login from '../Login'
import axios from 'axios';
import ReviewParkList from '../ReviewParkList'
import { useState, useEffect } from 'react'

/* helper function to hit endpoint and retrieve all skateparks when this component renders
 * https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/ */
const retrieveParks = function (setReviews) {
  axios.get("http://localhost:5000/reviews")
  .then((response) => {
    setReviews(response.data)
  })
}

// reviews page component with real API data now
const ReviewPage = ({ currentUser, setCurrentUser, key, setKey, register, setRegister }) => {
  const [reviews, setReviews] = useState({})

  useEffect(() => {
    retrieveParks(setReviews)
  }, []);

  if (!key && !register && currentUser.uuid === null) {
    return (
      <div>
        <Navbar
          buttonStatus='Register'
          setRegister={setRegister}
          setKey={setKey}
          setCurrentUser={setCurrentUser}
        />
        <Login 
          setRegister={setRegister} 
          setKey={setKey} 
          setCurrentUser={setCurrentUser}
        />
      </div>
    )
  } else if (!key && register && currentUser.uuid === null) {
    return (
      <div>
        <Navbar 
          buttonStatus='Login'
          setRegister={setRegister}
          setKey={setKey}
          setCurrentUser={setCurrentUser}
        />
        <SignUp 
          setRegister={setRegister} 
          setKey={setKey} 
          setCurrentUser={setCurrentUser}
        />
      </div>
    )
  } else {
    return (
      <>
        <Navbar 
          buttonStatus="Logout"
          setCurrentUser={setCurrentUser}
          key={key}
          setKey={setKey}
          register={register}
          setRegister={setRegister}
        />
        <ReviewParkList 
          reviews={reviews} 
        />
      </>
    )
  }
}

export default ReviewPage
