import React, { useState } from "react";
import { deleteRoutineActivity , patchRoutineActivity} from "../utilities/api";

// TODO: update in realtime (update/delete)

const UpdateRoutineActivity = ({updateActivity, setUpdateActivity, myDetailedRoutine, setMyDetailedRoutine, myRoutines, setMyRoutines, user, token}) => {
  const [count, setCount] = useState(updateActivity.count);
  const [duration, setDuration] = useState(updateActivity.duration);  
  
    // console.log('updateActivity', updateActivity)

    const handleSubmit = async () => {
        const patched = await patchRoutineActivity(updateActivity.routineActivityId, {count, duration}, token)
        if (patched.error) {
            alert(`There was an error updating your routine activity`);
        } else if (patched) {
            // setMyRoutines([patched, ...filterRoutines(myRoutines, patched)])
            // setMyDetailedRoutine(patched);
            // console.log(patched)
            resetState();
        } else {
            alert('There was an error updating your routine activity.')
        }
    }

    const handleDelete = async () => {
        const deleted = await deleteRoutineActivity(updateActivity.routineActivityId, token);
        console.log('deleted', deleted)
        if (deleted.error) {
            alert(`${deleted.message}`);
        } else if (deleted) {
            const newObj = {
                activities: filterOutDeleted(myDetailedRoutine.activities, updateActivity.activityId)
            }
            setMyDetailedRoutine(Object.assign(myDetailedRoutine.activities, newObj))
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

    // const filterRoutines = (oldRoutines, updatedRoutine) => {
    //     return oldRoutines.filter((routine) => {
    //         return routine.id != updatedRoutine.id;
    //     })
    // }

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
                    }}>Delete Activity</button>
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

