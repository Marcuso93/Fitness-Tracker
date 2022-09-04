export const tokenInStorage = () => {
  const localToken = localStorage.getItem('JWT');
  if (localToken && localToken.length > 0) {
    return localToken
  } else { return false }
}