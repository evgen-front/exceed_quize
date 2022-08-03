import { Route, Routes } from 'react-router-dom';
import { useAtom } from 'jotai';
import { Profile, Session, SignIn, SignUp, NewTest, CompletedTest } from 'Pages';

import { Home } from '../Pages/HomeTEST';
import { PrivateRoute } from './PrivateRoute';
import {
  SINGIN,
  SIGNUP,
  HOME,
  PROFILE,
  TESTNEW,
  TESTEDIT,
  SESSION,
  COMPLETED,
} from './routes';
import { userAtom } from 'atoms/userAtom';

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
        <Route path={COMPLETED} element={<CompletedTest />} />
      </Route>
    </Routes>
  );
};
