import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { fetchRoutines } from "../utilities/api";


const PublicRoutines = ({routines, setRoutines, detailRoutines, setDetailRoutines}) => {
    
    const history = useHistory();

    // const handleRoutineClick = (e, routine) => {
    //     setDetailRoutines(routines)
    // }

    useEffect(() => {
        (async () => {
            const getRoutines = await fetchRoutines();
            console.log(getRoutines)
            setRoutines(getRoutines)
            //console.log(setRoutines)
        })()
    }, [])

    return <>
    <h1>PublicRoutines</h1>

    <div>
        {
            routines.map((routine) => {
                //console.log("activities:",routine.activities)
                return <div onClick={(e) => { handleRoutineClick(e, routine) }} key={routine.id}>                    
                    <div>Name: {routine.name}</div>
                    <div>Goal: {routine.goal}</div>
                    <div>Creator: {routine.creatorName}</div>                            
                </div>
                })
            } 
        </div>
    </>
    }
    
    export default PublicRoutines;