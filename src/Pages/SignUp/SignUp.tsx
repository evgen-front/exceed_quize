import "antd/dist/antd.css";
import { Form, Input, Button } from "antd";
import { SignInUp } from "../../types/types";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../services/AuthService";
import { LoginView } from "../../Layouts/LoginView/LoginView";

export const SignUp = () => {
  const navigate = useNavigate();
  const onSubmit = ({ username, password, email }: SignInUp) => {
    AuthService.signup({ username, password, email })
      .then((result) => {
        console.log(result);

        if (result.status === 201) {
          alert("Пользователь успешно зарегистрирован");
          navigate("/signin");
        }
      })
      .catch((error) => {
        console.log(error.response); //!!!

        switch (error.response.status) {
          case 422:
            alert("Incorrect email");
            break;
          case 400:
            alert("User already registered");
            break;
        }
      });
  };

  return (
    <LoginView>
      <div className="SITitle">
        <h1>Регистрация</h1>
        <p>Введите данные, чтобы зарегистрироваться</p>
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
          label="E-mail"
          name="email"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Введите e-mail",
            },
          ]}
        >
          <Input placeholder="e-mail" />
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
        <Form.Item
          label="Подтвердите пароль"
          name="confirmPassword"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Повторите введённый выше пароль",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Пароли не совпадают");
              },
            }),
          ]}
        >
          <Input.Password placeholder="Подтвердите пароль" />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
      <p className="SIDownTitle">
        Уже есть аккаунт, <br />
        <Link to="/signin">авторизуйтесь</Link>
      </p>
    </LoginView>
  );
};
