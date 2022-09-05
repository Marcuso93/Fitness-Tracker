import React, { useEffect, useState } from "react";
import { CreateRoutine } from ".";
import { fetchMyRoutines } from "../utilities/api.js"
import { useHistory } from "react-router-dom";
import { findTokenInStorage } from "../utilities/utils";
import { getUser } from "../utilities/api.js";

const MyRoutines = ({ user, setUser, token, setToken, setMyDetailedRoutine, myRoutines, setMyRoutines }) => {
  const [isCreatingRoutine, setIsCreatingRoutine] = useState(false);
  const history = useHistory();

  const handleRoutineClick = (e, routine) => {
    e.preventDefault();  
    setMyDetailedRoutine(routine)
    history.push(`/my-routines/${routine.id}`)
  }

  useEffect(() => {
    (async() => {
      if (!token) {
        console.log('MyRoutines: No token, checking storage.');
        const storedToken = findTokenInStorage();
        if (storedToken) {
          setToken(storedToken);
          const storedUser = await getUser(storedToken);
          setUser(storedUser);
          const getMyRoutines = await fetchMyRoutines(storedUser);
          setMyRoutines(getMyRoutines);
          console.log('Ran with stored token successfully.');
        } else {
          alert('Please login or register.');
        }
      } else {
        const getMyRoutines = await fetchMyRoutines(user);
        setMyRoutines(getMyRoutines);
        console.log('MyRoutines: Already had token set, didnt need to check storage. Successful.');
      }
    })()
  }, [])

  return (
    <div className="text-forground">
      <h1>My Routines</h1>
      {
        (user && token) ?
        <>
          <h3>Select a routine to see and edit routine information and activities.</h3>
          <p>Visit the Activities tab to browse or create activities to add to your routines.</p> 
          <button
            type='submit'
            onClick={(event) => {
              event.preventDefault();
              setIsCreatingRoutine(true);
          }}>Create New Routine</button>
          {
            (myRoutines && myRoutines.length > 0) ?
            myRoutines.map((routine) => {
              return <div onClick={(e) => { handleRoutineClick(e, routine) }} key={routine.id} className="routine-body">
                <h3>{routine.name}</h3>
                <div>Goal: {routine.goal}</div>
              </div>
            }) :
            <h3>Let's create your first routine!</h3>
          }
          {
            isCreatingRoutine ?
            <CreateRoutine 
              setIsCreatingRoutine={setIsCreatingRoutine}
              user={user} 
              token={token}
              myRoutines={myRoutines} 
              setMyRoutines={setMyRoutines}
            /> :
            null
          }
        </> :
        <div>Please login or register to see and create your own routines!</div>
      }
    </div>
  )
}

export default MyRoutines;