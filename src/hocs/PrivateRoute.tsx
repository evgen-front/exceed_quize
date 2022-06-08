import { useAtom } from "jotai";
import { FC } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { userAtom } from "../atoms/userAtom";

interface PrivateRouteProps {
  children: JSX.Element;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const [user] = useAtom(userAtom);

  const location = useLocation();

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return children;
};
