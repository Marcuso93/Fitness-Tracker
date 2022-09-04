import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { fetchRoutines } from "../utilities/api";

const PublicRoutines = ({ routines, setRoutines, setDetailedRoutine }) => {
  const history = useHistory();

  const handleRoutineClick = (e, routine) => {
    e.preventDefault();
    setDetailedRoutine(routine)
    history.push(`/public-routines/${routine.id}`)
  }

  useEffect(() => {
    (async () => {
      const getRoutines = await fetchRoutines();
      setRoutines(getRoutines)
    })()
  }, [])

  return <>
    <div className="text-forground">
      <h1>Public Routines</h1>
        {
          (routines && routines.length > 0) ?
          <div className="public-routines">
            <h3>Select a routine to see more details.</h3>
            { 
              routines.map((routine) => {
                return <div onClick={(e) => { handleRoutineClick(e, routine) }} key={routine.id} className="routine-body">
                  <h3>{routine.name}</h3>
                  <div>Goal: {routine.goal}</div>
                  <div>Creator: {routine.creatorName}</div>
                </div>
              })
            } 
          </div> :
          <div>We are fetching public routines... or there was an error along the way...</div>
        }
    </div>
  </>
}

export default PublicRoutines;
