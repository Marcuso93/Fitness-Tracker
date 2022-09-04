import React, { useState } from "react";
import { deleteRoutineActivity, patchRoutineActivity, fetchMyRoutines } from "../utilities/api";

const UpdateRoutineActivity = ({updateActivity, setUpdateActivity, myDetailedRoutine, setMyDetailedRoutine, setMyRoutines, user, token}) => {
  const [count, setCount] = useState(updateActivity.count);
  const [duration, setDuration] = useState(updateActivity.duration);  

    const handleSubmit = async () => {
        const patched = await patchRoutineActivity(updateActivity.routineActivityId, {count, duration}, token)
        if (patched.error) {
            alert(`There was an error updating your routine activity`);
        } else if (patched) {
            const routines = await fetchMyRoutines(user);
            const getNewRoutines = () => {
                for (let i = 0; i < routines.length; i++) {
                    if (routines[i].id == myDetailedRoutine.id) {
                        return routines[i]
                    }
                }
            }
            setMyDetailedRoutine(getNewRoutines);
            setMyRoutines(routines);
            resetState();
        } else {
            alert('There was an error updating your routine activity.')
        }
    }

    const handleDelete = async () => {
        const deleted = await deleteRoutineActivity(updateActivity.routineActivityId, token);
        if (deleted.error) {
            alert(`${deleted.message}`);
        } else if (deleted) {
            const newObj = {
                activities: filterOutDeleted(myDetailedRoutine.activities, updateActivity.id)
            }
            setMyDetailedRoutine(Object.assign(myDetailedRoutine, newObj))
            resetState();
        } else {
            alert('There was an error deleting your routine activity.')
        }
    }

    const resetState = () => {
        setCount('');
        setDuration('');
        setUpdateActivity(false);
    }

    const filterOutDeleted = (activities, deletedActivityId) => {
        return activities.filter((activity) => {
            return activity.id != deletedActivityId
        })
    }

    if (!user && !token) { return null }  // Reduntant if MyRoutines only appears when logged in?

    return (
        <div className='popup-forms'>
            <form onSubmit={(event) => {
                event.preventDefault();
                handleSubmit();
            }}>
                <h3>Update Your Routine Activity</h3>
                <div>
                    <div>Count:</div>
                    <input
                        required
                        type='text'
                        name='count'
                        placeholder='Count Required'
                        value={count}
                        onChange={(event) => setCount(event.target.value)}
                    />
                </div>
                <div>
                    <div>Duration:</div>
                    <input
                        required
                        type='text'
                        name='duration'
                        placeholder='Duration Required'
                        value={duration}
                        onChange={(event) => { setDuration(event.target.value) }}
                    />
                </div>
                <button type='submit'>Submit</button>
                <button
                    type='button'
                    name='delete'
                    onClick={async (event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        handleDelete();
                    }}>Remove Activity</button>
                <button
                    type='button'
                    name='cancel'
                    onClick={(event) => {
                        event.preventDefault();
                        resetState();
                    }
                    }>Cancel</button>
            </form>
        </div>
    )
}


export default UpdateRoutineActivity

