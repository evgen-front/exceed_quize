import { useNavigate } from 'react-router-dom';
import { Form } from 'components';
import { Input, IResetPass } from 'types';
import { AuthService } from 'api/services/AuthService';
import { SINGIN } from 'Router/routes';
import { Main } from 'Layouts/Main';

const inputs: Input[] = [
  { title: 'Email', name: 'email', type: 'text' },
  { title: 'Введите новый пароль', name: 'password', type: 'password' },
  { title: 'Введите пароль еще раз', name: 'confirmPassword', type: 'password' },
];

export const ResetPass = () => {
  const navigate = useNavigate();
  const onSubmit = (values: IResetPass) => {
    AuthService.reset(values)
      .then(() => {
        navigate(SINGIN);
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
      <Form inputs={inputs} onSubmit={onSubmit} buttonText='Сменить пароль' />
    </Main>
  );
};
