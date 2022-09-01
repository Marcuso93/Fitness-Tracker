import { React, useState } from "react";
import ReactDOM from "react-dom";
import { NavLink, BrowserRouter, Route } from "react-router-dom";
import { Account, Activities, Home, MyRoutines, PublicRoutines, Logout } from './components/index';

const App = () => {

  // Set useStates
  const [user, setUser] = useState(false);
  const [token, setToken] = useState('');
  const [loggingOut, setLoggingOut] = useState(false);
  const [UserData, setUserData] = useState(false);  // what's the difference between userData and user?

  return (
    <main>
     
      <nav>
        
          <NavLink to="/home" className="navlink" activeClassName="active">
            Home
          </NavLink>

          <NavLink to="/public-routines" className="navlink" activeClassName="active">
            Public Routines
          </NavLink>
          
          {
            (token && user) ?
            <>
              <NavLink to="/my-routines" className="navlink" activeClassName="active">
                My Routines
              </NavLink>
            </> :
            null
          }

          <NavLink to="/activities" className="navlink" activeClassName="active">
            Activities
          </NavLink>

          <NavLink to="/account" className="navlink" activeClassName="active">
            {(token && user) ? 'My Account' : 'Login/Register'}
          </NavLink>

          {/* TODO: Create Logout Component for popup */}
          {/* TODO: Fix styling so this matches Navlinks and doesn't look like button */}
          {
            (token && user) ?
            <input 
              type='button'
              value='Logout' 
              className="navlink" 
              onClick={(event) => {
                event.preventDefault();
                setLoggingOut(true);
              }}
            /> :
            null 
          }
          
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
        <Activities />
      </Route>

      <Route path="/account">
        <Account token={token} setToken={setToken} user={user} setUser={setUser} />
      </Route>

      <Logout loggingOut={loggingOut} setLoggingOut={setLoggingOut} setUser={setUser} setToken={setToken} />
    
    </main>
  )
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
)