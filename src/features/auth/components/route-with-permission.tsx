import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { checkIfAuthorized } from "../utils/check-authorized";

export const RouteWithPermissions = () => {
  const isAuthorized = checkIfAuthorized(); 
  return isAuthorized ? <Outlet /> : <Navigate to="/articles" />;
};
