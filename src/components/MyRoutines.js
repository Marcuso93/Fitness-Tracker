import React, { useEffect, useState } from "react";
import { CreateRoutine } from ".";
import { fetchMyRoutines } from "../utilities/api.js"

// TODO:
    // be shown a form to create a new routine
    //     the form should have text fields for name and goal


    // for each routine which is owned by me I should
    //     be able to update the name and goal for the routine
    //     be able to delete the entire routine
    //     be able to add an activity to a routine via a small form which has a dropdown for all activities, an inputs for count and duration
    //     be able to update the duration or count of any activity on the routine
    //     be able to remove any activity from the routine


const MyRoutines = ({ user, token }) => {
  const [isCreatingRoutine, setIsCreatingRoutine] = useState(false);
  const [myRoutines, setMyRoutines] = useState([]);   // USE THIS TO SET myRoutines to display


  useEffect(() => {
    (async () => {
        const getMyRoutines = await fetchMyRoutines(user);
        setMyRoutines(getMyRoutines)
    })()
    }, [])
  return (
    <div className="text-forground">
      <h1>My Routines</h1>
      {/* display myRoutines from state */}
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
            isCreatingRoutine ?
            <CreateRoutine isCreatingRoutine={isCreatingRoutine} setIsCreatingRoutine={setIsCreatingRoutine} user={user} token={token} myRoutines={myRoutines} setMyRoutines={setMyRoutines}/> :
            null
          }
        </> :
        <div>Please login or register to see and create your own routines!</div>
      }
    </div>
  )
}

export default MyRoutines;