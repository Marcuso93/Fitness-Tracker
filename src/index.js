import { React, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { NavLink, BrowserRouter, Route } from "react-router-dom";
import { Account, Activities, Home, MyRoutines, PublicRoutines, Logout, DetailedRoutine, MyDetailedRoutine } from './components/index';
import { getUser } from "./utilities/api";
import { tokenInStorage } from "./utilities/utils";

const App = () => {
  const [user, setUser] = useState(false);
  const [token, setToken] = useState('');
  const [activities, setActivities]= useState([]);
  const [routines, setRoutines] = useState([]);
  const [myRoutines, setMyRoutines] = useState([]);
  const [detailedRoutine, setDetailedRoutine]= useState([]);
  const [myDetailedRoutine, setMyDetailedRoutine] = useState([]);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    (async () => {
      const localToken = tokenInStorage()
      if (localToken) {
        setToken(localToken);
        const localUser = await getUser();
        setUser(localUser);
      }
    })()
    }, [])

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
          <NavLink to="/my-routines" className="navlink" activeClassName="active">
            My Routines
          </NavLink> :
          null
        }

        <NavLink to="/activities" className="navlink" activeClassName="active">
          Activities
        </NavLink>

        <NavLink to="/account" className="navlink" activeClassName="active">
          {(token && user) ? 'My Account' : 'Login/Register'}
        </NavLink>

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
          setUser={setUser}
          token={token} 
          setToken={setToken}
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