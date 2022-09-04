import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { deleteMyRoutine, fetchActivities, addRoutineActivity, fetchMyRoutines } from "../utilities/api";
import { UpdateRoutine, UpdateRoutineActivity } from "./index";
import { tokenInStorage } from "../utilities/utils";
import { getUser } from "../utilities/api";

const MyDetailedRoutine = ({ myDetailedRoutine, setMyDetailedRoutine, token, setToken, user, setUser, myRoutines, setMyRoutines, activities, setActivities }) => {
  const [updateRoutine, setUpdateRoutine] = useState(false);
  const [newRoutineActivity, setNewRoutineActivity] = useState({});
  const [count, setCount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [updateActivity, setUpdateActivity] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // const storedToken = tokenInStorage();
    // if (storedToken) {
    //   setToken(storedToken);
    //   const storedUser = await getUser(storedToken);
    //   // console.log('storedToken storedUser', storedUser);
    //   setUser(storedUser);
    //   const getMyRoutines = await fetchMyRoutines(storedUser)
    //   setMyRoutines(getMyRoutines);
    // } else if (!storedToken) {
    //   const getStoredUser = await getUser();
    //   // console.log('!storedToken getStoredUser', getStoredUser);
    //   setUser(getStoredUser);
    //   const getMyRoutines = await fetchMyRoutines(user);
    //   setMyRoutines(getMyRoutines);
    // }
    
    // Better, but maybe not necessary:
    // (async () => {
    //   if (!token) {
    //     console.log('MyDetailedRoutne: No token, checking storage.')
    //     const storedToken = tokenInStorage();
    //     if (storedToken) {
    //       setToken(storedToken);
    //       const storedUser = await getUser(storedToken);
    //       setUser(storedUser);
    //       const getMyRoutines = await fetchMyRoutines(storedUser);
    //       setMyRoutines(getMyRoutines);
    //       console.log('Ran with stored token successfully.')
    //     } else {
    //       alert('Please login or register')
    //     }
    //   } else {
    //     const getMyRoutines = await fetchMyRoutines(user);
    //     setMyRoutines(getMyRoutines);
    //     console.log('MyDetailedRoutine: Already had token set, didnt need to check local storage. Successful.')
    //   }
    //   console.log('Getting activities.')
    //   const getActivities = await fetchActivities();
    //   setActivities(getActivities);
    //   console.log('Successful activities.')
    // })()

    // FULLY FUNCTIONING TO REVERT BACK TO:
    (async () => {
      const getActivities = await fetchActivities();
      setActivities(getActivities);
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
    if (count < 0 || duration < 0) {
      alert('Count and duration must be greater than or equal to zero.')
      return
    }
    const activityId = newRoutineActivity;
    await addRoutineActivity(
      myDetailedRoutine.id, 
      {activityId, count, duration}, 
      token
    );
    // const newActivity = filterActivities(activityId);
    // const newActivity = {
    //   id: activityId,
    //   // name: 
    //   // description: 
    // }
    const routines = await fetchMyRoutines(user);
    const getNewRoutineActivies = () =>{
      for (let i=0; i<routines.length; i++) {
        if (routines[i].id == myDetailedRoutine.id){
          return routines[i]
        }
      }
    }
    // const newObj = {
    //   activities: [newActivity, ...myDetailedRoutine.activities]
    // }
    // setMyDetailedRoutine(Object.assign(myDetailedRoutine, newObj))
    setMyDetailedRoutine(getNewRoutineActivies);
    setMyRoutines(routines);
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
            <div key={activity.id}>
              <h3>{activity.name}</h3>
              <div>{activity.description}</div>
              <div>Count: {activity.count}</div>
              <div>Duration (minutes): {activity.duration}</div>
              <button onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setUpdateActivity(activity);
              }
              }>Edit Activity</button>
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
            setNewRoutineActivity(event.target.value) 
        }}>
          <option value="any">Any</option>
          {activities.map(activity => {
            return <option value={activity.id} key={activity.id}>{activity.name}</option>
          })}
        </select>        
      </fieldset>
      <div>
        <div>Count:</div>
        <input
          required
          type='number'
          name='count'
          placeholder='Count Required'
          value={count}
          onChange={(event) => setCount(event.target.value)}
        />
      </div>
      <div>
        <div>Duration (in minutes):</div>
        <input
          required
          type='number'
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
    >Update Routine</button>
    <button onClick={(e) => { handleDeleteRoutine(e, myDetailedRoutine.id) }}>Delete</button>
    <button onClick={handleClose} >Close</button>
    {
      updateRoutine ?
      <UpdateRoutine 
        updateRoutine={updateRoutine} 
        setUpdateRoutine={setUpdateRoutine} 
        user={user} 
        token={token} 
        myDetailedRoutine={myDetailedRoutine}
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
        setMyRoutines={setMyRoutines}
        user={user}
        token={token}/> :
      null
    }
  </div>
}

export default MyDetailedRoutine;