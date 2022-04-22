import { Navigate, Route, Routes } from "react-router-dom";
import { SignIn } from "../Pages/SignIn";

export const Router = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />}/>
      <Route path="/" element={<Navigate to="/signin" />} />
    </Routes>
  )
}