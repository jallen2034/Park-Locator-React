import Navbar from '../Navbar'
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

export default ReviewPage
