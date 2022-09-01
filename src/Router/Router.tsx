import { Route, Routes } from 'react-router-dom';
import { useAtom } from 'jotai';
import { Profile, Session, SignIn, SignUp, CompletedTest, ResetPass } from 'Pages';

import { Home } from '../Pages/Home';
import { PrivateRoute } from './PrivateRoute';
import { SINGIN, SIGNUP, HOME, PROFILE, SESSION, COMPLETED, RESET } from './routes';
import { userAtom } from 'atoms/userAtom';

export const Router = () => {
  const [user] = useAtom(userAtom);

  return (
    <Routes>
      <Route element={<PrivateRoute allowed={!user} redirectTo={HOME} />}>
        <Route path={SINGIN} element={<SignIn />} />
        <Route path={SIGNUP} element={<SignUp />} />
        <Route path={RESET} element={<ResetPass />} />
      </Route>

      <Route path={HOME} element={<PrivateRoute allowed={!!user} />}>
        <Route index element={<Home />} />
        <Route path={PROFILE} element={<Profile />} />
        <Route path={SESSION} element={<Session />} />
        <Route path={COMPLETED} element={<CompletedTest />} />
      </Route>
    </Routes>
  );
};
