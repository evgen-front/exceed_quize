import { FC } from "react";
import { Navigate, Outlet, To } from "react-router-dom";
import { SINGIN } from "./routes";

interface PrivateRouteProps {
  children?: JSX.Element;
  allowed?: boolean;
  redirectTo?: To;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({
  children,
  allowed = false,
  redirectTo = SINGIN,
}) => {
  if (allowed) return children ? children : <Outlet />;
  return <Navigate to={redirectTo} replace />;
};
