import { checkIfAuthorized } from "../utils/check-authorized";

interface Props {
  children: React.ReactNode;
}

export const WithPermissions = ({ children }: Props) => {
  const isAuthorized = checkIfAuthorized(); 
  return isAuthorized ? <>{children}</> : <></>;
};
