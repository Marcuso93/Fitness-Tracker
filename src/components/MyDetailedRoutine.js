import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const MyDetailedRoutine = ({myDetailedRoutine, setMyDetailedRoutine}) => {
    
    const history = useHistory()
    
    const handleClose = () => {
        setMyDetailedRoutine ("")
        history.push("/my-routines")
    }
    
    return <div key = {myDetailedRoutine.id}>
        <h3>Routine</h3>
        <div>Name: {myDetailedRoutine.name}</div>
        <div>Goal: {myDetailedRoutine.goal}</div> 
        <button>Update</button>
        <button>Delete</button>
        <button onClick={handleClose} >Close</button>
    </div>
}

export default MyDetailedRoutine