import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../Pages/Home/Home";
import { Profile } from "../Pages/Profile/Profile";
import { NewTest } from "../Pages/NewTest/NewTest";
import { SignIn } from "../Pages/SignIn/SignIn";
import { SignUp } from "../Pages/SignUp/SignUp";
import { Session } from "../Pages/Session/Session";
import { PrivateRoute } from "../hocs/PrivateRoute";

export const Router = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Navigate to="/signin" />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/test/new"
        element={
          <PrivateRoute>
            <NewTest />
          </PrivateRoute>
        }
      />
      <Route
        path="/test/edit/:id"
        element={
          <PrivateRoute>
            <NewTest />
          </PrivateRoute>
        }
      />
      <Route
        path="/session/:id"
        element={
          <PrivateRoute>
            <Session />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
