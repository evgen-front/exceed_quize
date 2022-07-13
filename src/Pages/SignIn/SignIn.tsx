import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { AuthService } from 'services/AuthService';
import { UserService } from 'services/UserService';
import { userAtom } from 'atoms/userAtom';
import { Input, SignInUp } from 'types/types';
import { Form } from 'components';
import { HOME } from 'Router/routes';

const inputs: Input[] = [
  { title: 'Имя пользователя', name: 'username', type: 'text' },
  { title: 'Пароль', name: 'password', type: 'password' },
];

export const SignIn = () => {
  const [, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const onSubmit = (values: SignInUp) => {
    AuthService.signin(values)
      .then((r) => {
        if (r.status === 200) {
          UserService.getMe().then((r) => {
            let user = r.data;
            setUser(user);
            navigate(HOME);
          });
        }
      })
      .catch((e) => {
        switch (e.response.status) {
          case 403:
            alert('Unknown error');
            break;
          case 401:
            alert('Unauthorized. Incorrect login or password');
            break;
        }
      });
  };

  useEffect(() => {
    AuthService.getCSRF();
  }, []);

  return <Form inputs={inputs} onSubmit={onSubmit} buttonText='Войти' />;
};
