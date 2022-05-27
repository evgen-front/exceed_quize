import "antd/dist/antd.css";
import { Form, Input, Button } from "antd";
import { SignInUp } from "../../types/types";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../services/AuthService";
import { LoginView } from "../../Layouts/LoginView/LoginView";
import { UserService } from "../../services/UserService";
import { userAtom } from "../../atoms/userAtom";
import { useAtom } from "jotai";
import { useEffect } from "react";

export const SignIn = () => {
  const [, setUser] = useAtom(userAtom);
  const navigate = useNavigate();
  const onSubmit = (e: SignInUp) => {
    AuthService.signin(e)
      .then((r) => {
        if (r.status === 200) {
          UserService.getMe().then((r) => {
            let user = r.data;
            setUser(user);
            navigate("/home");
          });
        }
      })
      .catch((e) => {
        console.error(e, e?.message);
      });
  };


  useEffect(() => {
    AuthService.getCSRF()
  }, [])

  return (
    <LoginView>
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
    </LoginView>
  );
};
