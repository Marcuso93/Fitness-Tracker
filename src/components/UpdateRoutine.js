import React from 'react'
import { useState } from 'react'
import { apiCall } from '../utilities/api'

const UpdateRoutine = ({ updateRoutine, setUpdateRoutine, user, token, setMyDetailedRoutine }) => {
  const [name, setName] = useState(updateRoutine.name);
  const [goal, setGoal] = useState(updateRoutine.goal);
  const [isPublic, setIsPublic] = useState(updateRoutine.isPublic);

  const handleSubmit = async () => {
    // console.log('PATCH to apiCall', { name, goal, isPublic })
    const updatedRoutine = await apiCall(`routines/${updateRoutine.id}`, 'PATCH', token, { name, goal, isPublic })
    // console.log('updatedRoutine', updatedRoutine);
    if (updatedRoutine.error) {
      if (updatedRoutine.error === 'duplicate key value violates unique constraint "routines_name_key"') {
        alert(`Your routine must have a unique name.`);
      } else {
        alert('There was an error updating your new routine.')
      }
    } else if (updatedRoutine) {
      // setMyRoutines([updatedRoutine, ...filterRoutines(myRoutines, updatedRoutine)]);
      setMyDetailedRoutine(updatedRoutine);
      resetState();
    } else {
      alert('There was an error updating your new routine.')
    }
  }

  const resetState = () => {
    setName('');
    setGoal('');
    setIsPublic(null);
    setUpdateRoutine(false);
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
        <h3>Update Your Routine</h3>
        <div>
          <div>Name:</div>
          <input
            required
            type='text'
            name='name'
            placeholder='Name Required'
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <div>Goal:</div>
          <textarea
            required
            name='goal'
            placeholder='Goal Required'
            rows='3'
            cols='16'
            value={goal}
            onChange={(event) => { setGoal(event.target.value) }}
          />
        </div>
        <div>
          <label><input
            type='checkbox'
            defaultChecked={updateRoutine.isPublic}
            onChange={(event) => {
              event.preventDefault();
              setIsPublic(!isPublic);
            }}
          />Make this a public routine. (Optional)</label>
        </div>
        <button type='submit'>Submit</button>
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

export default UpdateRoutine;