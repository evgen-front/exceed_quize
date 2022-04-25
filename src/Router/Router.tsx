import { Navigate, Route, Routes } from "react-router-dom";
import { SignIn } from "../Pages/SignIn/SignIn";
import { SignUp } from "../Pages/SignUp/SignUp";

export const Router = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />}/>
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/" element={<Navigate to="/signin" />} />
    </Routes>
  )
}