import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { AuthService } from 'api/services/AuthService';
import { UserService } from 'api/services/UserService';
import { userAtom } from 'atoms/userAtom';
import { Input, SignInUp } from 'types';
import { Form } from 'components';
import { HOME } from 'Router/routes';
import { Main } from 'Layouts/MainView/Main';

const inputs: Input[] = [
  { title: 'Имя пользователя', name: 'username', type: 'text' },
  { title: 'Пароль', name: 'password', type: 'password' },
];

export const SignIn = () => {
  const [, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const onSubmit = (values: SignInUp) => {
    setUser({ id: 0, is_admin: true, is_active: true, email: '', username: 'admin' });
    navigate(HOME);

    // AuthService.signin(values)
    //   .then((r) => {
    //     if (r.status === 200) {
    //       UserService.getMe().then((r) => {
    //         let user = r.data;
    //         setUser(user);
    //         navigate(HOME);
    //       });
    //     }
    //   })
    //   .catch((e) => {
    //     switch (e.response.status) {
    //       case 403:
    //         alert('Unknown error');
    //         break;
    //       case 401:
    //         alert('Unauthorized. Incorrect login or password');
    //         break;
    //     }
    //   });
  };

  return (
    <Main>
      <Form inputs={inputs} onSubmit={onSubmit} buttonText='Войти' />
    </Main>
  );
};
