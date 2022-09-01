import { React, useState } from "react";
import ReactDOM from "react-dom";
import { NavLink, BrowserRouter, Route } from "react-router-dom";
import { Account, Activities, Home, MyRoutines, PublicRoutines } from './components/index';

const App = () => {

  // Set useStates
  const [User, setUser] = useState(false);
  const [token, setToken] = useState('');
  const [UserData, setUserData] = useState(false);
  const [activities, setActivities]= useState([]);

  return (
    <main>
     
      <nav>
        
          <NavLink to="/home" className="navlink" activeClassName="active">
            Home
          </NavLink>

          <NavLink to="/public-routines" className="navlink" activeClassName="active">
            Public Routines
          </NavLink>

          <NavLink to="/my-routines" className="navlink" activeClassName="active">
            My Routines
          </NavLink>

          <NavLink to="/activities" className="navlink" activeClassName="active">
            Activities
          </NavLink>

          <NavLink to="/account" className="navlink" activeClassName="active">
            Login/Register
          </NavLink>
          
      </nav>

      {/* Routes and components */}
      
      <Route exact path='/'>
        {/* to account page to login/register maybe */}
        <Account />
      </Route>

      <Route path="/home">
        <Home />
      </Route>

      <Route path="/public-routines">
        <Route path= "/routines/:routineId">
          
        </Route>
        <PublicRoutines />
      </Route>

      <Route path="/my-routines">
        <MyRoutines />
      </Route>
      
      <Route path="/activities">
        <Route path="/activities/:activityId">

        </Route>
        <Activities 
          activities={activities} 
          setActivities={setActivities}
        />
      </Route>

      <Route path="/account">
        <Account />
      </Route>
    </main>
  )
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
)