export const checkIfAuthorized = () : boolean => {
  const token = localStorage.getItem('bibletag-token');
  if (token===import.meta.env.VITE_TOKEN) {
    return true;
  }
  return false;
}