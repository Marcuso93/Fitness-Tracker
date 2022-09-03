import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { fetchRoutines } from "../utilities/api";



const PublicRoutines = ({routines, setRoutines, setDetailedRoutine}) => {
    // TODO: figure out useHistory (is going to /undefined)
    const history = useHistory();

    const handleRoutineClick = (e, routine) => {
        setDetailedRoutine(routine)
        history.push(`/public-routines/${routine.id}`)
    }

    useEffect(() => {
        (async () => {
            const getRoutines = await fetchRoutines();
            //console.log(getRoutines)
            setRoutines(getRoutines)
            //console.log(setRoutines)
        })()
    }, [])

    return <>
    <div className="text-forground">
    <h1>Public Routines</h1>

    <div className="public-routines">
        {
            routines.map((routine) => {
                //console.log("activities:",routine.activities)
                return <div onClick={(e) => { handleRoutineClick(e, routine) }} key={routine.id} className="routine-body">                    
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
