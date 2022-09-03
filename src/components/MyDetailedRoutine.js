import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { deleteMyRoutine, fetchActivities, addRoutineActivity } from "../utilities/api";
import {UpdateRoutine, UpdateRoutineActivity} from "./UpdateRoutine";

// TODO: add the added activity to the page

const MyDetailedRoutine = ({ myDetailedRoutine, setMyDetailedRoutine, token, user, myRoutines, setMyRoutines, activities, setActivities }) => {
  const [updateRoutine, setUpdateRoutine] = useState(false);
  const [newRoutineActivity, setNewRoutineActivity] = useState({});
  const [count, setCount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [updateActivity, setUpdateActivity] = useState(false);
  const history = useHistory();

  // console.log('newRoutineActivity', newRoutineActivity);

  useEffect(() => {
    (async () => {
      const getActivities = await fetchActivities();
      setActivities(getActivities)
    })()
  }, [])

  const handleClose = () => {
    setMyDetailedRoutine("");
    history.push("/my-routines");
  }

  const handleDeleteRoutine = async (e, Id) => {
    e.stopPropagation()
    if (window.confirm("Are you sure you want to delete your routine?"))
    deleteMyRoutine(token, Id);
    const filteredRoutines = myRoutines.filter(routine => routine.id != Id)
    setMyRoutines(filteredRoutines);
    history.push(`/my-routines/`);
  }

  const handleRoutineActivitySubmit = async () => {
    // send it routineId and {activityId: newRoutineActivity.id, count, duration}
    const activityId = newRoutineActivity;
    // console.log('submitting routineId, body, token', [myDetailedRoutine.id, {activityId, count, duration}, token])
    const addedRoutineActivity = await addRoutineActivity(
      myDetailedRoutine.id, 
      {activityId, count, duration}, 
      token
    );
    // console.log('addRoutineActivity', addedRoutineActivity)
    resetState();
  }
  
  const resetState = () => {
    setNewRoutineActivity({});
    setCount(0);
    setDuration(0);
  }


  return <div key={myDetailedRoutine.id} className="myDetailedRoutine">
    <h3>Routine</h3>
    <div>Name: {myDetailedRoutine.name}</div>
    <div>Goal: {myDetailedRoutine.goal}</div>
    {
      (myDetailedRoutine.activities && myDetailedRoutine.activities.length > 0) ?
      <>
        <h3>Routine Activities</h3>
        <div>Click on an activity to edit or delete it.</div>
        {
          myDetailedRoutine.activities.map((activity) => {
            return (
            <div key={activity.id} onClick={
              setUpdateActivity(activity)
            }>
              <h3>{activity.name}</h3>
              <div>{activity.description}</div>
              <div>Duration: {activity.duration}</div>
              <div>Count: {activity.count}</div>
            </div>
          )})
        }
      </> :
      null
    }
    <form 
      onSubmit={(event) => {
        event.preventDefault();
        handleRoutineActivitySubmit();
    }}>
      <h3>Add an activity to your routine:</h3>
      <fieldset>
        <label htmlFor="activities">Search Activities:</label>
        <select
          name="activities"
          id="select-activities"
          value={newRoutineActivity}
          onChange={(event) => { 
            // console.log('event.target.value', JSON.stringify(event.target.value));
            setNewRoutineActivity(event.target.value) 
        }}>
          <option value="any">Any</option>
          {activities.map(activity => {
            // console.log('selected activity', activity);
            return <option value={activity.id} key={activity.id}>{activity.name}</option>
          })}
        </select>        
      </fieldset>
      <div>
        <div>Count:</div>
        <input
          required
          type='text'
          name='count'
          placeholder='Count Required'
          value={count}
          onChange={(event) => setCount(event.target.value)}
        />
      </div>
      <div>
        <div>Duration:</div>
        <input
          required
          type='text'
          name='duration'
          placeholder='Duration Required'
          value={duration}
          onChange={(event) => setDuration(event.target.value)}
        />
        </div>
        <button type='submit'>Add Activity</button>
    </form>
    <button
      onClick={(event) => {
        event.preventDefault();
        setUpdateRoutine(myDetailedRoutine);
      }}
    >Update</button>
    <button onClick={(e) => { handleDeleteRoutine(e, myDetailedRoutine.id) }}>Delete</button>
    <button onClick={handleClose} >Close</button>
    {
      updateRoutine ?
      <UpdateRoutine 
        updateRoutine={updateRoutine} 
        setUpdateRoutine={setUpdateRoutine} 
        user={user} 
        token={token} 
        setMyDetailedRoutine={setMyDetailedRoutine} 
        myRoutines={myRoutines} 
        setMyRoutines={setMyRoutines} /> :
      null
    }
    {
      updateActivity ?
      <UpdateRoutineActivity 
        updateActivity={updateActivity} 
        setUpdateActivity={setUpdateActivity} 
        myDetailedRoutine={myDetailedRoutine} 
        setMyDetailedRoutine={setMyDetailedRoutine} 
        myRoutines={myRoutines}
        setMyRoutines={setMyRoutines}/> :
      null
    }
  </div>
}

export default MyDetailedRoutine;