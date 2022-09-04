import React from 'react';
import { removeTokenFromStorage } from '../utilities/utils';

const Logout = ({ loggingOut, setLoggingOut, setUser, setToken }) => {
  const handleLogout = (event) => {
    event.preventDefault();
    setUser(false);
    setToken('');
    removeTokenFromStorage();
    setLoggingOut(false);
  }

  const handleCancel = (event) => {
    event.preventDefault();
    setLoggingOut(false);
  }

  return (
    loggingOut ?
    <>
      <div className='logout-popup' style={{zIndex: '4'}}>
        <form>
          <h3>Are you sure?</h3>
          <button onClick={ handleLogout }>Logout</button>
          <button onClick={ handleCancel }>Cancel</button>
        </form>
      </div>
    </> :
    null
  )
}

export default Logout;