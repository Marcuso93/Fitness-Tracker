import React from 'react'
import { useState } from 'react'
import { patchRoutine } from '../utilities/api'
import { fetchMyRoutines } from '../utilities/api'

const UpdateRoutine = ({ 
    updateRoutine, 
    setUpdateRoutine, 
    user, 
    token, 
    myDetailedRoutine, 
    setMyDetailedRoutine,
    setMyRoutines 
}) => {
  const [name, setName] = useState(updateRoutine.name);
  const [goal, setGoal] = useState(updateRoutine.goal);

  const handleSubmit = async () => {
    const updatedRoutine = await patchRoutine(updateRoutine.id, token, name, goal);
    if (updatedRoutine.error) {
      if (updatedRoutine.error === 'duplicate key value violates unique constraint "routines_name_key"') {
        alert(`Your routine must have a unique name.`);
      } else {
        alert(`There wasm an error updating your routine. ${updateRoutine.message}`)
        // alert('There was an error updating your routine.')
      }
    } else if (updatedRoutine) {
      const routines = await fetchMyRoutines(user);
      const getNewRoutine = () => {
        for (let i = 0; i < routines.length; i++) {
          if (routines[i].id == myDetailedRoutine.id) {
            return routines[i]
          }
        }
      }
      setMyDetailedRoutine(getNewRoutine);
      setMyRoutines(routines);
      resetState();
    } else {
      alert('There was an error updating your new routine.')
    }
  }

  const resetState = () => {
    setName('');
    setGoal('');
    setUpdateRoutine(false);
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