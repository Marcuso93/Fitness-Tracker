export const BASE_URL = 'https://pacific-falls-66418.herokuapp.com/api/'

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
  if (token) { body.headers = Object.assign(body.headers, { 'Authorization': `Bearer ${token}` }) }
  return body;
}