import { FormikValues } from 'formik';

export const validateInputs = (
  values: FormikValues,
  isSignInPage: boolean,
  isResetPage: boolean
) => {
  const errors: {
    username?: string;
    password?: string;
    email?: string;
    confirmPassword?: string;
  } = {};

  if (!isResetPage) {
    if (/^\s/.test(values.username)) {
      errors.username = 'Не начинайте с пробелов';
    }
    if (!/^[a-zA-Zа-яА-Я\s]+$/.test(values.username)) {
      errors.username = 'Только латиница или кирилица';
    }
    if (values.username.length < 2) {
      errors.username = 'Минимум 2 символа';
    }
    if (!values.username) {
      errors.username = 'Введите имя';
    }
    if (!/^(?=.*\d)[a-zA-Z\d]{6,25}$/.test(values.password)) {
      errors.password = 'Минимум 6 символов, латинские буквы и минимум 1 цифра';
    }
  }
  if (/^\s/.test(values.password)) {
    errors.password = 'Не начинайте с пробелов';
  }
  if (!values.password) {
    errors.password = 'Введите пароль';
  }
  if (!isSignInPage) {
    if (
      !/^\w+([-+.']\w+)*@fojin.tech(; ?\w+([-+.']\w+)*@fojin.tech)*$/.test(values.email)
    ) {
      errors.email = 'Введите корректный email, заканчивающийся на fojin.tech';
    }
    if (!values.email) {
      errors.email = 'Введите email';
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Повторите пароль';
    }
    if (values.password && values.confirmPassword) {
      if (values.password !== values.confirmPassword) {
        errors.password = 'Пароли не совпадают';
        errors.confirmPassword = 'Пароли не совпадают';
      }
    }
  }
  return errors;
};
