import React from 'react';
import 'antd/dist/antd.css';
import { Form } from 'antd';
import { Input, Text, Box, Button, FormItem } from 'components';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/AuthService';
import { UserService } from '../../services/UserService';
import { userAtom } from '../../atoms/userAtom';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { HOME, SIGNUP } from '../../Router/routes';
import { SignInUp } from '../../types/types';

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

  return (
    <Box padding='28px 15px'>
      <Text fontSize='24px' fontWeight={700}>
        Авторизация
      </Text>
      <Box mt='30px'>
        <Form layout='vertical' onFinish={onSubmit}>
          <FormItem
            label='Имя пользователя'
            name='username'
            rules={[
              {
                required: true,
                message: 'Введите имя пользователя',
              },
              {
                whitespace: true,
                message: 'Не начинайте с пробелов',
              },
              {
                pattern: /^[a-zA-Zа-яА-Я\s]+$/,
                message: 'Только русские или латинские буквы',
              },
              {
                min: 2,
                message: 'Минимум 2 символа',
              },
            ]}
          >
            <Input />
          </FormItem>
          <FormItem
            label='Пароль'
            name='password'
            rules={[
              {
                required: true,
                message: 'Введите пароль',
              },
              {
                whitespace: true,
                message: 'Не начинайте с пробелов',
              },
              {
                pattern: /^(?=.*\d)[a-zA-Z\d]{6,25}$/,
                message: 'Минимум 6 символов, латинские буквы и минимум 1 цифра',
              },
            ]}
          >
            <Input type='password' />
          </FormItem>
          <Box display='flex' mb='30px'>
            <Text fontWeight={700} color='#2C2C2C'>
              Нет аккаунта?
            </Text>
            <Box ml='5px'>
              <Link to={SIGNUP}>
                <Text fontWeight={700} color='#FF8A00'>
                  Зарегистрируйтесь
                </Text>
              </Link>
            </Box>
          </Box>
          <FormItem>
            <Button type='submit'>Войти</Button>
          </FormItem>
        </Form>
      </Box>
    </Box>
  );
};
