import React, { useState, useEffect } from "react";
import { fetchActivities } from "../utilities/api";


const Activities = ({activities, setActivities}) => {

    useEffect(() => {
        (async () => {
            const getActivities = await fetchActivities();
            console.log(getActivities)
            setActivities(getActivities)
        })()
    }, [])

    return <>
    <h1>Publicactivity</h1>

    <div>
        {
            activities.map((activity) => {
                //console.log("activities:",routine.activities)
                return <div onClick={(e) => { handleRoutineClick(e, activity) }} key={activity.id}>                    
                    <div>{activity.name}</div>
                                 
                </div>
                })
            } 
        </div>
    </>
    }
    

export default Activities;