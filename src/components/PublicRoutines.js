import React, { useState, useEffect } from "react";
import { fetchRoutines } from "../utilities/api";
import { useHistory } from "react-router-dom"


const PublicRoutines = ({routines, setRoutines, setDetailedRoutine}) => {
    
    const history = useHistory();

    const handleRoutineClick = (e, routine) => {
        setDetailedRoutine(routine)
        history.push(`/public-routines/${routines.id}`)
    }

    useEffect(() => {
        (async () => {
            const getRoutines = await fetchRoutines();
            console.log(getRoutines)
            setRoutines(getRoutines)
            //console.log(setRoutines)
        })()
    }, [])

    return <>
    <div className="text-forground">
    <h1>PublicRoutines</h1>

    <div>
        {
            routines.map((routine) => {
                console.log("activities:",routine.activities)
                return <div onClick={(e) => { handleRoutineClick(e, routine) }} key={routine.id}>                    
                    <div>Name: {routine.name}</div>
                    <div>Goal: {routine.goal}</div>
                    <div>Creator: {routine.creatorName}</div>                            
                </div>
                })
            } 
        </div>
        </div>
    </>
    }
    
    export default PublicRoutines;