import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../Pages/Home/Home";
import { NewTest } from "../Pages/NewTest/NewTest";
import { SignIn } from "../Pages/SignIn/SignIn";
import { SignUp } from "../Pages/SignUp/SignUp";

export const Router = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/test/new" element={<NewTest />} />
      <Route path="/" element={<Navigate to="/signin" />} />
    </Routes>
  );
};
