import React from "react";
import { useHistory } from "react-router-dom";

const DetailedRoutine = ({ detailedRoutine, setDetailedRoutine }) => {

  const history = useHistory()
  const handleClose = () => {
    setDetailedRoutine("")
    history.push("/public-routines")
  }

  return <div key={detailedRoutine.id} className="detailedRoutines">
    <h1>{detailedRoutine.name} Routine</h1>
    <h3>Goal: {detailedRoutine.goal}</h3>
    {
      (detailedRoutine.activities && detailedRoutine.activities.length > 0) ?
      <>
        <h1 className="styleLines">Routine Activities</h1>
        {
          detailedRoutine.activities.map((activity) => {
            return <div key={activity.id} className="detailedStyleLines">
              <h3>{activity.name}</h3>
              <div>{activity.description}</div><br/>
              <div>Duration: {activity.duration}</div>
              <div>Count: {activity.count}</div>
            </div>
          }) 
        }
      </> :
      null
    }
    <button onClick={handleClose} >Close</button>
  </div>
}

export default DetailedRoutine;