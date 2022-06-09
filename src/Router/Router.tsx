import { Outlet, Route, Routes } from "react-router-dom";
import { Home } from "../Pages/Home/Home";
import { Profile } from "../Pages/Profile/Profile";
import { NewTest } from "../Pages/NewTest/NewTest";
import { SignIn } from "../Pages/SignIn/SignIn";
import { SignUp } from "../Pages/SignUp/SignUp";
import { Session } from "../Pages/Session/Session";
import { PrivateRoute } from "./PrivateRoute";
import { SINGIN, SIGNUP, HOME, PROFILE, TESTNEW, TESTEDIT, SESSION } from "./routes";
import { userAtom } from "../atoms/userAtom";
import { useAtom } from "jotai";

export const Router = () => {
  const [user] = useAtom(userAtom);

  return (
    <Routes>
      <Route path={SINGIN} element={<SignIn />} />
      <Route path={SIGNUP} element={<SignUp />} />

      <Route path={HOME} element={<PrivateRoute allowed={!!user} />}>
        <Route index element={<Home />} />
        <Route path={PROFILE} element={<Profile />} />
        <Route path={TESTNEW} element={<NewTest />} />
        <Route path={TESTEDIT} element={<NewTest />} />
        <Route path={SESSION} element={<Session />} />
      </Route>
    </Routes>
  );
};
