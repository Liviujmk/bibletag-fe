import { ALLOWED_USER } from "../../../common/constants/shared-constants";
import { getUserFromLocalStorage } from "../../../common/utils/getUserFromLocalStorage";

export const checkIfAuthorized = () : boolean => {
  let isAuthenticated = getUserFromLocalStorage() === ALLOWED_USER;
  return isAuthenticated;
}