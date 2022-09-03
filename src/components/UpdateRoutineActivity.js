import React, { useState } from "react";
import { deleteRoutineActivity , patchRoutineActivity} from "../utilities/api";

const UpdateRoutineActivity = ({updateActivity, setUpdateActivity, myDetailedRoutine, setMyDetailedRoutine, myRoutines, setMyRoutines}) => {
  const [count, setCount] = useState(updateActivity.count);
  const [duration, setDuration] = useState(updateActivity.duration);  
  
    const handleSubmit = async () => {
        const patched = await patchRoutineActivity(updateActivity.id, {count, duration}, token)
        if (patched.error) {
            alert(`There was an error updating your routine activity`);
        } else if (patched) {
            setMyRoutines([patched, ...filterRoutines(myRoutines, patched)])
            setMyDetailedRoutine(patched);
            resetState();
        } else {
            alert('There was an error updating your routine activity.')
        }
    }

    const resetState = () => {
        setName('');
        setGoal('');
        setUpdateActivity(false);
    }

    const filterRoutines = (oldRoutines, updatedRoutine) => {
        return oldRoutines.filter((routine) => {
            return routine.id != updatedRoutine.id;
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
                    onclick={(event) => {
                        event.preventDefault();
                        deleteRoutineActivity(updateActivity.id, token);
                        // API call to delete routine activity
                        // Pass in myDetailedRoutine.id as routineId
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

