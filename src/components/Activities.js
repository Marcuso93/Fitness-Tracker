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
    <div className="text-forground">
    <h1>Publicactivity</h1>

    <div>
        {
            activities.map((activity) => {
                //console.log("activities:",routine.activities)
                return <div key={activity.id} className="activity-body">                    
                    <div>{activity.name}</div>
                                 
                </div>
                })
            } 
        </div>
        </div>
    </>
    }
    

export default Activities;