import React from 'react'
import { useState } from 'react'
import { apiCall } from '../utilities/api'

const CreateRoutine = ({ isCreatingRoutine, setIsCreatingRoutine, user, token, myRoutines, setMyRoutines }) => {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [isPublic, setIsPublic] = useState(null);
  
  // be shown a form to create a new routine
    //     the form should have text fields for name and goal

  const handleSubmit = async () => {
    // do API call
    console.log('POST to apiCall', {name, goal, isPublic})
    const createdRoutine = await apiCall('routines', 'POST', token, {name, goal, isPublic})
    // if error, alert, if success reset everything
    console.log('createdRoutine', createdRoutine);
    if (createdRoutine.error) {
      alert(`${createdRoutine.error.message}.`);
    } else if (createdRoutine.id) {
      resetState();
    }
  }

  const handleCancel = () => {
    // reset everything
    resetState();
    setIsCreatingRoutine(false);
  }

  const resetState = () => {
    // reset everything
    setName('');
    setGoal('');
    setIsPublic(null);
    setIsCreatingRoutine(false);
    setMyRoutines([createdRoutine, ...myRoutines]);
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
          <div>Routine Name:</div>
          <input
            required
            type='text'
            name='name'
            placeholder='Routine Name Required'
            value={ name }
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <div>Routine Goal:</div>
          <input
            required
            type='text'
            name='goal'
            placeholder='Routine Goal Required'
            value={ goal }
            onChange={(event) => setGoal(event.target.value)}
          />
        </div>
        <div>
          <label><input
            type='checkbox'
            checked={isPublic}
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
            handleCancel();
          }
        }>Cancel</button>
      </form>
    </div>
  )
}

export default CreateRoutine;