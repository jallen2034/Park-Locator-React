import React, {useState} from 'react'
import Navbar from '../Navbar'
import HomePage from '../HomePage'
import SignUp from '../SignUp'
import Login from '../Login'

const Application = ({ currentUser, setCurrentUser, key, setKey, register, setRegister }) => {
 
  console.log("currentUser.uuid in application route: ", currentUser.uuid)
  console.log("register in application component: ", register)

  if (!register && !currentUser.uuid) {
    console.log("FIRST")
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
  } else if (register && !currentUser.uuid) {
    console.log("SECOND")
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
    console.log("THIRD")
    return (
      <div>
        <Navbar 
          buttonStatus='Logout'
          setRegister={setRegister}
          setKey={setKey}
          setCurrentUser={setCurrentUser}
        />
        <HomePage currentUser={currentUser} />
      </div>
    )
  }
}

export default Application
