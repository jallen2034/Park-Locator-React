import Navbar from '../Navbar'
import ReviewParkList from '../ReviewParkList'

import React from 'react'

const ReviewPage = () => {
  return (
    <>
      <Navbar buttonStatus="logout" />
      <ReviewParkList />
    </>
  )
}

export default ReviewPage
