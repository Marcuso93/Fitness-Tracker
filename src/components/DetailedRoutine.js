import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const DetailedRoutine  = ({ detailedRoutine, setDetailedRoutine }) => {
    
    const history = useHistory()
    const handleClose = () => {
        setDetailedRoutine ("")
        history.push("/public-routines")
    }

    return <div key={detailedRoutine.id} className="detailedRoutines">                    
                <h3>Routine</h3>
                <div>Name: {detailedRoutine.name}</div>
                <div>Goal: {detailedRoutine.goal}</div>                
            { detailedRoutine.activities.map((activity) => {
                return <div key={activity.id}>
                    <h3>Title: {activity.name}</h3>
                    <div>Description: {activity.description}</div>
                    <div>Duration: {activity.duration}</div>
                    <div>Count: {activity.count}</div>
                </div>
            }) 
            }
            <button onClick={handleClose}>Close</button>
            </div>            
        } 

export default DetailedRoutine