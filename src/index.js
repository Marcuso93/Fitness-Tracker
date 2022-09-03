import { React, useState } from "react";
import ReactDOM from "react-dom";
import { NavLink, BrowserRouter, Route } from "react-router-dom";
import { Account, Activities, Home, MyRoutines, PublicRoutines, Logout, DetailedRoutine, CreateRoutine, MyDetailedRoutine } from './components/index';

//-Uregistered:
  //***see a Sign Up/Sign In form
  //***register
  ///***can edit messages if error during registration
  //***tabbed navigation for Routines and activities
  //***see list of all activities

//-Registered:
  //***login
  //can edit messages if error during registration
  //***stay logged in between page visits
  //***log out
  //***see tabbed navigation for Routines, My Routines (once logged in), and Activities (with matching routes)
  //***Form to create a new routine(routine name, goal, creator username)
  //For owned routine
    //***update the name and goal for the routine
    //***delete the entire routine
    //***add an activity to a routine via a form which has a dropdown for all activities, an inputs for count and duration
    //***update the duration or count of any activity on the routine
    //remove any activity from the routine
  //On Activities tab
    //***show form to create new activity (name and description)
    //***show error if already exists
    
const App = () => {
  const [user, setUser] = useState(false);
  const [token, setToken] = useState('');
  const [activities, setActivities]= useState([]);
  const [routines, setRoutines] = useState([]);
  const [myRoutines, setMyRoutines] = useState([]);
  const [detailedRoutine, setDetailedRoutine]= useState([]);
  const [myDetailedRoutine, setMyDetailedRoutine] = useState([]);
  const [loggingOut, setLoggingOut] = useState(false);

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
      
      <h1 id="site-name">Fitness Trac.kr</h1>

      <Route exact path='/'>
        {/* to account page to login/register maybe */}
        <Account token={token} setToken={setToken} user={user} setUser={setUser} />
      </Route>

      <Route path="/home">
        <Home />
      </Route>

      <Route path="/public-routines">
        <PublicRoutines 
          routines={routines} 
          setRoutines={setRoutines}
          detailedRoutine={detailedRoutine} 
          setDetailedRoutine={setDetailedRoutine}
        />
        <Route path= "/public-routines/:routineId">
          <DetailedRoutine detailedRoutine={detailedRoutine} setDetailedRoutine={setDetailedRoutine} />          
        </Route>
      </Route>

      <Route path="/my-routines">
        <MyRoutines 
          user={user} 
          token={token} 
          myDetailedRoutine={myDetailedRoutine} 
          setMyDetailedRoutine={setMyDetailedRoutine} 
          myRoutines={myRoutines} 
          setMyRoutines={setMyRoutines}
        />
        <Route path ="/my-routines/:routineId">
          <MyDetailedRoutine 
            myDetailedRoutine={myDetailedRoutine} 
            setMyDetailedRoutine={setMyDetailedRoutine} 
            token={token} 
            user={user} 
            myRoutines={myRoutines} 
            setMyRoutines={setMyRoutines}
            activities={activities}
            setActivities={setActivities}
          />
        </Route>
      </Route>
      
      <Route path="/activities">
        <Activities activities={activities} setActivities={setActivities} user={user} token={token} />
        <Route path="/activities/:activityId">
        {/* TODO: Do we need to do something with this route? */}
        </Route>
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