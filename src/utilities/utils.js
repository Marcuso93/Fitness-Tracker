export const setTokenInStorage = (token) => {
  localStorage.setItem('JWT', JSON.stringify(token));
  console.log('Token set in localStorage.')
}

export const removeTokenFromStorage = () => {
  localStorage.removeItem('JWT');
  console.log('Token removed from localStorage.')
}

export const tokenInStorage = () => {
  const localToken = localStorage.getItem('JWT');
  if (localToken && localToken.length > 0) {
    console.log('Token found in localStorage.')
    return localToken
  } else { return false }
}