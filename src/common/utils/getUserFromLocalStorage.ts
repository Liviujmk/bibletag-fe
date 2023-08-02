import { AuthProvider } from "../constants/shared-constants";

export const getUserFromLocalStorage = () => {
  let user = localStorage.getItem(AuthProvider);
  return user;
};