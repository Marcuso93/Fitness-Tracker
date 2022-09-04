import React from 'react';
import { useState } from 'react';
import { apiCall } from '../utilities/api';


const Account = ({ token, setToken, user, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isRegistered) {
      const login = await apiCall('users/login', 'POST', null, {username, password});
      if (login.error) {
        alert(`${login.name}. ${login.message} If you are not an existing user, please register now.`);
      } else if (login.user && login.token){
        setUser(login.user);
        // setToken(login.token);   // Shouldn't be necessary anymore
        localStorage.setItem('JWT', JSON.stringify(login.token));
        const localToken = JSON.parse(localStorage.getItem('JWT'))
        setToken(localToken);
        resetInputs();
      } else {
        alert('There was an error during login.')
      }
    } else {
      if (password === confirmPassword) {
        const register = await apiCall('users/register', 'POST', null, {username, password});
        if (register.error) {
          alert(`${register.name}. ${register.message}`)
        } else if (register.user && register.token) {
          setUser(register.user);
          // setToken(register.token);    // Shouldn't be necessary anymore
          localStorage.setItem('JWT', JSON.stringify(register.token));
          const localToken = JSON.parse(localStorage.getItem('JWT'))
          setToken(localToken);
          resetInputs();
        } else {
          alert('There was an error during registration.')
        }
      } else {
        alert("The password and password confirmation don't match!");
      }
    }
  }

  const resetInputs = () => {
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setIsRegistered(true);
  }

  return (
    <>
    <div className='login'>
      <h1 className='account'>Account</h1>
      {
        (user && token) ?
        <>
          <h3>User Profile</h3>
          {/* TODO: Add whatever info we want to show here if user is logged in */}
          <p>You are logged in as { user.username }.</p>
          <p>Add whatever information/instructions we want.</p>
        </> :
        <>
          <form className = 'login-form'onSubmit={ handleSubmit } >
            <h3>{ isRegistered ? "Login" : "Register"}</h3>
            <div>
              <div>Username:</div>
              <input
                required
                type='text'
                name='username'
                placeholder='Username'
                value={ username }
                onChange={ (event) => { setUsername(event.target.value) }}/>
            </div>
            <div>
              <div>Password:</div>
              <input
                required
                type='password'
                name='password'
                placeholder='Password'
                value={ password }
                onChange={ (event) => { setPassword(event.target.value) }}/>
            </div>
            { !isRegistered ?
              <div>
                <div>Confirm Password:</div>
                <input
                  type='password'
                  name='confirm-password'
                  placeholder='Password'
                  onChange={(event) => { 
                    setConfirmPassword(event.target.value) 
                }}/>
                {
                  (password && password.length > 0 && password.length < 8) ? 
                  <p style={{color: 'red'}}>Password must be at least 8 characters.</p> :
                  null 
                }
                {
                  (password && confirmPassword && password !== confirmPassword) ?
                  <p style={{color: 'red'}}>Passwords don't match!</p> :
                  null
                }
              </div> :
              null
            }
            <button type='submit'>{ isRegistered ? "Login" : "Register" }</button>
            {
              isRegistered ?
              <>
                <p>New to Fitness Trac.kr?</p>
                <button 
                  type='submit'
                  onClick={(event) => {
                    event.preventDefault();
                    setIsRegistered(false);
                }}>Register New User</button>
              </> :
              <>
                <p>Already a Fitness Trac.kr user?</p>
                <button
                  type='submit'
                  onClick={(event) => {
                    event.preventDefault();
                    setIsRegistered(true);
                  }}
                >Just Login</button>
              </>
            }
          </form>
        </>
      }
    </div>
    </>
  )
}

export default Account;