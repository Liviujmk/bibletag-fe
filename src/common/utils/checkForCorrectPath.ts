export const checkForCorrectPath = () : boolean => {
  if (window.location.pathname === "/") return true;
  if (window.location.pathname.split("/")[2]) { 
    if (window.location.pathname.split("/")[2].length === 24 && !window.location.pathname.split("/")[3]) return false;
  }
  return true;
}