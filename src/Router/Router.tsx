import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../Pages/Home/Home";
import { Profile } from "../Pages/Profile/Profile";
import { NewTest } from "../Pages/NewTest/NewTest";
import { SignIn } from "../Pages/SignIn/SignIn";
import { SignUp } from "../Pages/SignUp/SignUp";
import { Session } from "../Pages/Session/Session";
import { ChatPage } from "../Pages/Chat/ChatPage";

export const Router = () => {
  return (
    <Routes>
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/test/new" element={<NewTest />} />
      <Route path="/test/edit/:id" element={<NewTest />} />
      <Route path="/session/:id" element={<Session />} />
      <Route path="/" element={<Navigate to="/signin" />} />
    </Routes>
  );
};
