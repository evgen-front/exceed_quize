import { useNavigate } from 'react-router-dom';
import { Form } from 'components';
import { ISignUp, Input } from 'types';
import { AuthService } from 'api/services/AuthService';
import { HOME } from 'Router/routes';
import { Main } from 'Layouts/Main';
import { UserService } from 'api/services/UserService';
import { useAtom } from 'jotai';
import { userAtom } from 'atoms/userAtom';

const inputs: Input[] = [
  { title: 'Имя пользователя', name: 'username', type: 'text' },
  { title: 'Email', name: 'email', type: 'text' },
  { title: 'Придумайте пароль', name: 'password', type: 'password' },
  { title: 'Введите пароль еще раз', name: 'confirmPassword', type: 'password' },
];

export const SignUp = () => {
  const navigate = useNavigate();
  const [, setUser] = useAtom(userAtom);
  const onSubmit = ({ username, password, email }: ISignUp) => {
    AuthService.signup({ username, password, email })
      .then((result) => {
        if (result.status === 201) {
          AuthService.signin({ username, password }).then((r) => {
            if (r.status === 200) {
              UserService.getMe().then((r) => {
                let user = r.data;
                setUser(user);
                navigate(HOME);
              });
            }
          });
        }
      })
      .catch((error) => {
        switch (error.response.status) {
          case 422:
            alert('Incorrect email');
            break;
          case 400:
            alert('User already registered');
            break;
        }
      });
  };

  return (
    <Main>
      <Form inputs={inputs} onSubmit={onSubmit} buttonText='Создать аккаунт' />
    </Main>
  );
};
