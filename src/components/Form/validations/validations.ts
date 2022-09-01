export interface ErrorsValues {
  username?: string | boolean;
  password?: string | boolean;
  email?: string | boolean;
  confirmPassword?: string | boolean;
}

const validations = {
  withoutSpace: (value: string) => /^\s/.test(value) && 'Не начинайте с пробелов',

  onlyCyrillicLatin: (value: string) =>
    !/^[a-zA-Zа-яА-Я\s]+$/.test(value) && 'Только латиница или кирилица',

  moreTwoSymbols: (value: string) => value.length < 2 && 'Минимум 2 символа',

  notNull: (value: string) => !value && 'Поле не может быть пустое',

  passValid: (value: string) =>
    !/^(?=.*\d)[a-zA-Z\d]{6,25}$/.test(value) &&
    'Минимум 6 символов, латинские буквы и минимум 1 цифра',

  fojinEmail: (value: string) =>
    !/^\w+([-+.']\w+)*@fojin.tech(; ?\w+([-+.']\w+)*@fojin.tech)*$/.test(value) &&
    'Введите корректный email, заканчивающийся на fojin.tech',

  sameValues: (value: string, secondValue: string) =>
    value !== secondValue && 'Пароли не совпадают',
};

export default validations;
