import { useAtom } from "jotai";
import { FC } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { userAtom } from "../atoms/userAtom";

export const PrivateRoute: FC = () => {
  const [user] = useAtom(userAtom);

  return user ? <Outlet /> : <Navigate to="/signin" replace />;
};
