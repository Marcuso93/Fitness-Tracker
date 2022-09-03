import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { deleteMyRoutine } from "../utilities/api";
import UpdateRoutine from "./UpdateRoutine";

const MyDetailedRoutine = ({ myDetailedRoutine, setMyDetailedRoutine, token, user, myRoutines, setMyRoutines }) => {
  const [updateRoutine, setUpdateRoutine] = useState(false);
  const history = useHistory();

  const handleClose = () => {
    setMyDetailedRoutine("");
    history.push("/my-routines");
  }

  const handleDeleteRoutine = async (e, Id) => {
    e.stopPropagation()
    if (window.confirm("Are you sure you want to delete your routine?"))
      deleteMyRoutine(token, Id);
    history.push(`/my-routines/`);
  }

  return <div key={myDetailedRoutine.id} className="myDetailedRoutine">
    <h3>Routine</h3>
    <div>Name: {myDetailedRoutine.name}</div>
    <div>Goal: {myDetailedRoutine.goal}</div>
    {
      (myDetailedRoutine.activities && myDetailedRoutine.activities.length > 0) ?
      <>
        <h3>Routine Activities</h3>
        {
          myDetailedRoutine.activities.map((activity) => {
            return <div key={activity.id}>
              <h3>{activity.name}</h3>
              <div>{activity.description}</div>
              <div>Duration: {activity.duration}</div>
              <div>Count: {activity.count}</div>
            </div>
          })
        }
      </> :
      null
    }
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
        <UpdateRoutine updateRoutine={updateRoutine} setUpdateRoutine={setUpdateRoutine} user={user} token={token} setMyDetailedRoutine={setMyDetailedRoutine} myRoutines={myRoutines} setMyRoutines={setMyRoutines} /> :
        null
    }
  </div>
}

export default MyDetailedRoutine;