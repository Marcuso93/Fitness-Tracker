import React from 'react'
import { useState } from 'react'
import { apiCall } from '../utilities/api'

const CreateActivity = ({ isCreatingActivity, setIsCreatingActivity, user, token, activities, setActivities }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    for (let i=0; i<activities.length; i++) {
      if (activities[i].name === name){
        alert('That activity already exists.');
        return;
      }
    }
    // console.log('POST to apiCall', { name, description })
    const createdActivity = await apiCall('activities', 'POST', token, { name, description })
    // console.log('createdActivity', createdActivity);
    
    if (createdActivity.error) {
      alert(`${createdActivity.message}`);
    } else if (createdActivity.id) {
      setActivities([createdActivity, ...activities]);
      resetState();
    } else {
      alert('There was an error in creating your new activity.')
    }
  }

  const resetState = () => {
    setName('');
    setDescription('');
    setIsCreatingActivity(false);
  }

  if (!user && !token) { return null }

  return (
    <div className='popup-forms'>
      <form onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}>
        <h3>Create a New Activity</h3>
        <div>
          <div>Name:</div>
          <input
            required
            type='text'
            name='name'
            placeholder= 'Name Required'
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <div> Description:</div>
          <textarea
            required
            name='description'
            placeholder='Description Required'
            rows='3'
            cols='16'
            value={description}
            onChange={event => setDescription(event.target.value)}
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

export default CreateActivity;
