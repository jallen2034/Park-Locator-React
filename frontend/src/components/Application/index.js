import React, {useState} from 'react'
import Navbar from '../Navbar'
import HomePage from '../HomePage'
import SignUp from '../SignUp'
import Login from '../Login'

const Application = ({ currentUser, setCurrentUser }) => {
 
  // session storage token & register state to test conditional rendering in storybook
  const [key, setKey] = useState(false)
  const [register, setRegister] = useState(false)
  console.log("setRegister setter: ", setRegister)

  if (!key && !register && !currentUser) {
    return (
      <div>
        <Navbar
          buttonStatus='Register'
          setRegister={setRegister}
          setKey={setKey}
          setCurrentUser={setCurrentUser}
        />
        <Login setRegister={setRegister} setKey={setKey} />
      </div>
    )
  } else if (!key && register && !currentUser) {
    return (
      <div>
        <Navbar 
          buttonStatus='Login'
          setRegister={setRegister}
          setKey={setKey}
          setCurrentUser={setCurrentUser}
        />
        <SignUp setRegister={setRegister} setKey={setKey} />
      </div>
    )
  } else {
    return (
      <div>
        <Navbar 
          buttonStatus='Logout'
          setRegister={setRegister}
          setKey={setKey}
          setCurrentUser={setCurrentUser}
        />
        <HomePage />
      </div>
    )
  }
}

export default Application
