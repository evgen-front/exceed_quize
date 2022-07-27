import { useNavigate } from 'react-router-dom';
import { Form } from 'components';
import { SignInUp, Input } from 'types';
import { AuthService } from 'api/services/AuthService';
import { SINGIN } from 'Router/routes';
import { Main } from 'Layouts/MainView/Main';

const inputs: Input[] = [
  { title: 'Имя пользователя', name: 'username', type: 'text' },
  { title: 'Email', name: 'email', type: 'text' },
  { title: 'Придумайте пароль', name: 'password', type: 'password' },
  { title: 'Введите пароль еще раз', name: 'confirmPassword', type: 'password' },
];

export const SignUp = () => {
  const navigate = useNavigate();
  const onSubmit = ({ username, password, email }: SignInUp) => {
    AuthService.signup({ username, password, email })
      .then((result) => {
        console.log(result);

        if (result.status === 201) {
          navigate(SINGIN);
        }
      })
      .catch((error) => {
        console.log(error.response); //!!!

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
