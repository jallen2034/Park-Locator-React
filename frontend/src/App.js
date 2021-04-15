import Application from '../src/components/Application'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UsersParksPage from '../src/components/UsersParksPage'
import ReviewPage from '../src/components/ReviewPage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/userSavedParks">
            <UsersParksPage />
          </Route>
          <Route path="/reviews">
            <ReviewPage />
          </Route>
          <Route path="/">
            <Application />
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
