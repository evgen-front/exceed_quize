import React, { useState } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button } from "antd";
import { SignInUpTypes } from "../../types/types";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../services/AuthService";

export const SignIn = () => {
  const navigate = useNavigate();
  const onSubmit = (e: SignInUpTypes) => {
    AuthService.signin(e)
      .then((r) => {
        console.log(r.status);
        if (r.status === 200) {
          navigate("/home");
        }
      })
      .catch((e) => {
        console.error(e, e?.message);
      });
    console.log(e, "submitted");
  };

  return (
    <div className="SIWrapper">
      <div className="SITitle">
        <h1>Авторизация</h1>
        <p>Введите свои данные, чтобы войти</p>
      </div>
      <Form onFinish={onSubmit} layout="vertical">
        <Form.Item
          label="Имя пользователя"
          name="username"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Введите имя пользователя",
            },
            {
              whitespace: true,
              message: "Не начинайте с пробелов",
            },
            {
              pattern: /^[a-zA-Zа-яА-Я\s]+$/,
              message: "Только русские или латинские буквы",
            },
            {
              min: 2,
              message: "Минимум 2 символа",
            },
          ]}
        >
          <Input placeholder="Имя пользователя" />
        </Form.Item>
        <Form.Item
          label="Пароль"
          name="password"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Введите пароль",
            },
            {
              whitespace: true,
              message: "Не начинайте с пробелов",
            },
            {
              pattern: /^(?=.*\d)[a-zA-Z\d]{6,25}$/,
              message: "Минимум 6 символов, латинские буквы и минимум 1 цифра",
            },
          ]}
        >
          <Input.Password placeholder="Пароль" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Войти
          </Button>
        </Form.Item>
      </Form>
      <p className="SIDownTitle">
        Если ещё нет аккаунта, <br />
        <Link to="/signup">зарегистрируйтесь</Link>
      </p>
    </div>
  );
};
