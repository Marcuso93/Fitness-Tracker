import React, { useEffect, useState } from "react";
import { CreateRoutine } from ".";
import { fetchMyRoutines } from "../utilities/api.js"
import { useHistory } from "react-router-dom";

const MyRoutines = ({ user, token, setMyDetailedRoutine, myRoutines, setMyRoutines }) => {
  const [isCreatingRoutine, setIsCreatingRoutine] = useState(false);
  const history = useHistory();

  const handleRoutineClick = (e, routine) => {
    e.preventDefault();  
    setMyDetailedRoutine(routine)
    history.push(`/my-routines/${routine.id}`)
  }

  useEffect(() => {
    (async () => {
        const getMyRoutines = await fetchMyRoutines(user);
        setMyRoutines(getMyRoutines);
    })()
    }, [])

  return (
    <div className="text-forground">
      <h1>My Routines</h1>
      {
        (user && token) ?
        <>
          <h3>Select a routine to see and edit routine information and activities.</h3>
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
                <div>Name: {routine.name}</div>
                <div>Goal: {routine.goal}</div>
              </div>
            }) :
            <div>Let's create your first routine!</div>
          }
          {
            isCreatingRoutine ?
            <CreateRoutine setIsCreatingRoutine= {setIsCreatingRoutine}
            user= {user} token= {token}
            myRoutines= {myRoutines} setMyRoutines= {setMyRoutines}/> :
            null
          }
        </> :
        <div>Please login or register to see and create your own routines!</div>
      }
    </div>
  )
}

export default MyRoutines;