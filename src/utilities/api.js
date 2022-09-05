// export const BASE_URL = 'https://pacific-falls-66418.herokuapp.com/api/'

// TODO: there was some issue with our API (500 Internal Service Error)
export const BASE_URL = 'https://fitnesstrac-kr.herokuapp.com/api/'

export const apiCall = async (url, method = 'GET', token, body) => {
  let data = false;
  try {
    const response = await fetch(BASE_URL + url, setToken(getFetchOptions(method, body), token));
    data = await response.json();

    if (data.error) {
      throw data.error;
    }
  } catch (err) {
    console.error(err);
  }
  return data;
}

const getFetchOptions = (method, body) => {
  return {
    method: method.toUpperCase(),
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
}

const setToken = (body, token) => {
  const localToken = JSON.parse(localStorage.getItem('JWT'));
  if (localToken) {
    body.headers = Object.assign(body.headers, { 'Authorization': `Bearer ${localToken}` })
    return body;
  } else if (token) { body.headers = Object.assign(body.headers, { 'Authorization': `Bearer ${token}` }) }
  return body;
}

export const fetchActivities = async() => {
  const data = await apiCall('activities', "GET", null)
  return data || []
}

export const postActivity = async(token, name, description) => {
  const data = await apiCall('activities', 'POST', token, { name, description });
  return data || []
}

export const fetchRoutines = async() => {
  const data = await apiCall('routines', "GET", null)
  return data || []
}

export const registerUser =async(username, password) => {
  const data = await apiCall('users/register', 'POST', null, { username, password });
  return data || []
}

export const loginUser = async(username, password) => {
  const data = await apiCall('users/login/', 'POST', null, { username, password });
  return data || []
}

export const fetchMyRoutines = async(user) => {
  const data = await apiCall(`users/${user.username}/routines`, 'GET')
  return data || []
}

export const postRoutine = async(token, name, goal) => {
  const data = await apiCall('routines', 'POST', token, { name, goal, isPublic: true });
  return data || []
}

export const patchRoutine = async(routineId, token, name, goal) => {
  const data = await apiCall(`routines/${routineId}`, 'PATCH', token, { name, goal, isPublic: true });
  return data || []
}

export const deleteMyRoutine = async (token, routineId) => {
  const data = await apiCall(`routines/${routineId}`, "DELETE", token)
  return data || []
}

export const addRoutineActivity = async (routineId, routineActivity, token) => {
  const data = await apiCall(`routines/${routineId}/activities`, "POST", token, routineActivity)
  return data || []
}

export const deleteRoutineActivity = async (routineActivityId, token) => {
  const data = await apiCall(`routine_activities/${routineActivityId}`, "DELETE", token)
  return data || []
}

export const patchRoutineActivity = async (routineActivityId, routineActivityFields, token) => {
  const data = await apiCall(`routine_activities/${routineActivityId}`, "PATCH", token, routineActivityFields)
  return data || []
}

export const getUser = async (possibleToken) => {
  const data = await apiCall(`users/me/`, 'GET', possibleToken)
  return data || []
}
