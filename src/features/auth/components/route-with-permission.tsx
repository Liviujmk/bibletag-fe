import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { checkIfAuthorized } from "../utils/check-authorized";

export const RouteWithPermissions = () => {
  let isAuthorized = localStorage.getItem("CognitoIdentityServiceProvider.6dkvni4bmjqumuonkr4ti929df.LastAuthUser") === 'liviumit'
  console.log(isAuthorized)
  return isAuthorized ? <Outlet /> : <Navigate to="/articles" />;
};
