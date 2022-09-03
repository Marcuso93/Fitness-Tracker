import React, { useEffect, useState } from "react";
import { CreateRoutine } from ".";
import { fetchMyRoutines } from "../utilities/api.js"
import { useHistory } from "react-router-dom";

// TODO:
    //  X  be shown a form to create a new routine
    //  X  the form should have text fields for name and goal


    // for each routine which is owned by me I should
    //  X  be able to update the name and goal for the routine
    //  X  be able to delete the entire routine
    //     be able to add an activity to a routine via a small form which has a dropdown for all activities, an inputs for count and duration
    //     be able to update the duration or count of any activity on the routine
    //     be able to remove any activity from the routine

const MyRoutines = ({ user, token, setMyDetailedRoutine, myRoutines, setMyRoutines}) => {
  const [isCreatingRoutine, setIsCreatingRoutine] = useState(false);
  const history = useHistory();

  const handleRoutineClick = (e, routine) => {
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
          <button
            type='submit'
            onClick={(event) => {
              event.preventDefault();
              setIsCreatingRoutine(true);
          }}>Create New Routine</button>
          {
            (myRoutines && myRoutines.length > 0) ?
            myRoutines.map((routine) => {
              return <div onClick={(e) => { handleRoutineClick(e, routine) }} key={routine.id} className="myRoutine">
                <div>Name: {routine.name}</div>
                <div>Goal: {routine.goal}</div>
              </div>
            }) :
            <div>Let's create your first routine!</div>
          }
          {
            isCreatingRoutine ?
            <CreateRoutine setIsCreatingRoutine={setIsCreatingRoutine} user={user} token={token} myRoutines={myRoutines} setMyRoutines={setMyRoutines}/> :
            null
          }
        </> :
        <div>Please login or register to see and create your own routines!</div>
      }
    </div>
  )
}

export default MyRoutines;