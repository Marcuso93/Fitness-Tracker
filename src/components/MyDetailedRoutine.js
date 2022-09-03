import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UpdateRoutine from "./UpdateRoutine";

const MyDetailedRoutine = ({myDetailedRoutine, setMyDetailedRoutine, token, user, myRoutines, setMyRoutines}) => {
    const [updateRoutine, setUpdateRoutine] = useState(false);
    const history = useHistory()
    
    const handleClose = () => {
        setMyDetailedRoutine ("")
        history.push("/my-routines")
    }
    
    return <div key = {myDetailedRoutine.id}>
        <h3>Routine</h3>
        <div>Name: {myDetailedRoutine.name}</div>
        <div>Goal: {myDetailedRoutine.goal}</div> 
        <button
            onClick={(event) => {
                event.preventDefault();
                setUpdateRoutine(myDetailedRoutine);
            }}
        >Update</button>
        <button>Delete</button>
        <button onClick={handleClose} >Close</button>
        {
            updateRoutine ?
            <UpdateRoutine updateRoutine={updateRoutine} setUpdateRoutine={setUpdateRoutine} user={user} token={token} myRoutines={myRoutines} setMyRoutines={setMyRoutines} setMyDetailedRoutine={setMyDetailedRoutine} /> :
            null
        }
    </div>
}

export default MyDetailedRoutine