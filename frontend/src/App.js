import Application from '../src/components/Application'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UsersParksPage from '../src/components/UsersParksPage'
import ReviewPage from '../src/components/ReviewPage'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";


function App() {
  const sessionUuid = window.localStorage.getItem('Uuid')
  const [currentUser, setCurrentUser] = useState({
    uuid: sessionUuid || null
  })

  console.log("currentUser in App.js: ", currentUser);

  return (
    <>
      <Router>
        <Switch>
          <Route path="/userSavedParks">
            <UsersParksPage currentUser={currentUser} setCurrentUser={setCurrentUser}  />
          </Route>
          <Route path="/reviews">
            <ReviewPage currentUser={currentUser} setCurrentUser={setCurrentUser} />
          </Route>
          <Route path="/">
            <Application currentUser={currentUser} setCurrentUser={setCurrentUser} />
          </Route>
        </Switch>
      </Router>
      <div>
        <ToastContainer
          position="bottom-center"
          autoClose={4000}
        />
      </div>
    </>
  );
}

export default App;
