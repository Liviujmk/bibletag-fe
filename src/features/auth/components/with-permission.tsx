import { Auth } from "aws-amplify";
import { checkIfAuthorized } from "../utils/check-authorized";

interface Props {
  children: React.ReactNode;
}

export const WithPermissions = ({ children }: Props) => {
  let isAuthorized = localStorage.getItem("CognitoIdentityServiceProvider.6dkvni4bmjqumuonkr4ti929df.LastAuthUser") === 'liviumit'
  return isAuthorized ? <>{children}</> : <></>;
};
