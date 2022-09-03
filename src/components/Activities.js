import React, { useState, useEffect } from "react";
import { fetchActivities } from "../utilities/api";
import CreateActivity from "./CreateActivity";


const Activities = ({ activities, setActivities, user, token }) => {
  const [isCreatingActivity, setIsCreatingActivity] = useState(false);

  useEffect(() => {
    (async () => {
      const getActivities = await fetchActivities();
      setActivities(getActivities)
    })()
  }, [])

  return (
    <div className="text-forground">
      <h1>Public Activities</h1>
      {
        (user && token) ?
        <>
          <button
            type='submit'
            onClick={(event) => {
              event.preventDefault();
              setIsCreatingActivity(true);
            }}>Create New Activity</button>
        </> :
        <h3>Login or register to create new activities.</h3>
      }
      <div>
        {
          (activities && activities.length > 0) ?
          activities.map((activity) => {
            return (
              <div key={activity.id} className="activity-body">
                <h3>{activity.name}</h3>
                <div>{activity.description}</div>
              </div>
            )
          }) :
          <div>We are fetching activities... or there was an error along the way...</div>
        }
      </div>
      {
        (isCreatingActivity && user && token) ?
          <CreateActivity setIsCreatingActivity={setIsCreatingActivity} user={user} token={token} activities={activities} setActivities={setActivities} /> :
          null
      }
    </div>
  )
}


export default Activities;