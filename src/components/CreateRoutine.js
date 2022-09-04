import React from 'react'
import { useState } from 'react'
import { postRoutine } from '../utilities/api'

const CreateRoutine = ({ setIsCreatingRoutine, user, token, myRoutines, setMyRoutines }) => {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');

  const handleSubmit = async () => {    
    const createdRoutine = await postRoutine(token, name, goal);
    if (createdRoutine.error) {
      if (createdRoutine.error === 'duplicate key value violates unique constraint "routines_name_key"') {
        alert(`You must create a routine with a unique name.`);
      } else {
        alert(`There was an error in creating your new routine. ${createdRoutine.message}`)
        // alert('There was an error in creating your new routine.')
      }
    } else if (createdRoutine.id) {
      setMyRoutines([createdRoutine, ...myRoutines]);
      resetState();
    } else {
      alert('There was an error in creating your new routine.')
    }
  }

  const resetState = () => {
    setName('');
    setGoal('');
    setIsCreatingRoutine(false);
  }

  if (!user && !token) { return null }  // Reduntant if MyRoutines only appears when logged in?

  return (
    <div className='popup-forms'>
      <form onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}>
        <h3>Create a New Routine</h3>
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

export default CreateRoutine;
