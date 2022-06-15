import React, { ChangeEvent, useState } from 'react';
import 'antd/dist/antd.css';
import { Input, Text, Box, Button } from 'components';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/AuthService';
import { UserService } from '../../services/UserService';
import { userAtom } from '../../atoms/userAtom';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { HOME, SIGNUP } from '../../Router/routes';

const formItems: { title: string; password: boolean; name: 'password' | 'username' }[] = [
  { title: 'Имя пользователя', password: false, name: 'username' },
  { title: 'Пароль', password: true, name: 'password' },
];

export const SignIn = () => {
  const [formValues, setFormValues] = useState<{ username: string; password: string }>({
    username: '',
    password: '',
  });
  const [, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const handleInputChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    AuthService.signin(formValues)
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

  return (
    <Box padding='28px 15px'>
      <Text fontSize='24px' fontWeight={700}>
        Авторизация
      </Text>
      <Box mt='10px'>
        <form onSubmit={onSubmit}>
          {formItems.map(({ password, title, name }) => (
            <Box key={title} display='flex' flexDirection='column' mt='20px'>
              <Text fontSize='14px' fontWeight='600'>
                {title}
              </Text>
              <Box height='10px' />
              <Input
                password={password}
                name={name}
                value={formValues[name]}
                onChange={handleInputChange}
              />
            </Box>
          ))}
          <Box mt='30px' />
          <Button type='submit'>Войти</Button>
        </form>
      </Box>
    </Box>
  );
  {
    /*<Form onFinish={onSubmit} layout='vertical'>*/
  }
  {
    /*  <Form.Item*/
  }
  {
    /*    label='Имя пользователя'*/
  }
  {
    /*    name='username'*/
  }
  {
    /*    hasFeedback*/
  }
  {
    /*    rules={[*/
  }
  {
    /*      {*/
  }
  {
    /*        required: true,*/
  }
  {
    /*        message: 'Введите имя пользователя',*/
  }
  {
    /*      },*/
  }
  {
    /*      {*/
  }
  {
    /*        whitespace: true,*/
  }
  {
    /*        message: 'Не начинайте с пробелов',*/
  }
  {
    /*      },*/
  }
  {
    /*      {*/
  }
  {
    /*        pattern: /^[a-zA-Zа-яА-Я\s]+$/,*/
  }
  {
    /*        message: 'Только русские или латинские буквы',*/
  }
  {
    /*      },*/
  }
  {
    /*      {*/
  }
  {
    /*        min: 2,*/
  }
  {
    /*        message: 'Минимум 2 символа',*/
  }
  {
    /*      },*/
  }
  {
    /*    ]}*/
  }
  {
    /*  >*/
  }
  {
    /*    <Input placeholder='Имя пользователя' />*/
  }
  {
    /*  </Form.Item>*/
  }
  {
    /*  <Form.Item*/
  }
  {
    /*    label='Пароль'*/
  }
  {
    /*    name='password'*/
  }
  {
    /*    hasFeedback*/
  }
  {
    /*    rules={[*/
  }
  {
    /*      {*/
  }
  {
    /*        required: true,*/
  }
  {
    /*        message: 'Введите пароль',*/
  }
  {
    /*      },*/
  }
  {
    /*      {*/
  }
  {
    /*        whitespace: true,*/
  }
  {
    /*        message: 'Не начинайте с пробелов',*/
  }
  {
    /*      },*/
  }
  {
    /*      {*/
  }
  {
    /*        pattern: /^(?=.*\d)[a-zA-Z\d]{6,25}$/,*/
  }
  {
    /*        message: 'Минимум 6 символов, латинские буквы и минимум 1 цифра',*/
  }
  {
    /*      },*/
  }
  {
    /*    ]}*/
  }
  {
    /*  >*/
  }
  {
    /*    <Input placeholder='Пароль' />*/
  }
  {
    /*  </Form.Item>*/
  }
  {
    /*  <Form.Item>*/
  }
  {
    /*    <Button block type='primary' htmlType='submit'>*/
  }
  {
    /*      Войти*/
  }
  {
    /*    </Button>*/
  }
  {
    /*  </Form.Item>*/
  }
  {
    /*</Form>*/
  }
};
