import { FC, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Formik, Form as FormikForm } from 'formik';
import styled from 'styled-components';
import { SINGIN, SIGNUP, RESET } from 'Router/routes';
import { Box, Input, Button, Text, Space } from 'components';
import { colors } from 'consts';
import { FormikValues } from 'formik';
import { resetScheme, signInScheme, signUpScheme } from './validations/scheme';

interface FormProps {
  inputs: { title: string; name: string; type: 'email' | 'password' | 'text' }[];
  onSubmit: (values: any) => void;
  buttonText: string;
}

const StyledForm = styled(FormikForm)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const Form: FC<FormProps> = ({ inputs, onSubmit, buttonText }) => {
  const initialValues = useMemo(
    () => inputs.reduce((prev, { name }) => ({ ...prev, [name]: '' }), {}),
    [inputs]
  );
  const { pathname } = useLocation();
  const isSignInPage = pathname === SINGIN;
  const isResetPage = pathname === RESET;
  const to = isSignInPage ? SIGNUP : SINGIN;

  const validateScheme = useCallback(
    (values: FormikValues) => {
      switch (pathname) {
        case SINGIN:
          return signInScheme(values);
        case SIGNUP:
          return signUpScheme(values);
        case RESET:
          return resetScheme(values);

        default:
          return;
      }
    },
    [pathname]
  );

  return (
    <Box padding='46px 20px' height='100%' display='flex' flexDirection='column'>
      <Text fontSize={24} fontWeight={700}>
        {isResetPage ? 'Восстановление пароля' : isSignInPage ? 'Вход' : 'Регистрация'}
      </Text>
      <Space height={46} style={{ flexShrink: 0 }} />
      <Formik
        initialValues={initialValues as any}
        validate={(values) => validateScheme(values)}
        onSubmit={(values) => onSubmit(values)}
      >
        {({ errors, values, touched, handleChange }) => (
          <StyledForm>
            <Box>
              {inputs.map(({ title, type, name }) => (
                <Box key={title}>
                  <Text fontSize='16px' fontWeight='700'>
                    {title}
                  </Text>
                  <Space height='12px' />
                  <Input
                    name={name}
                    type={type}
                    value={values[name]}
                    onChange={handleChange}
                    errorMessage={touched[name] ? errors[name] : ''}
                  />
                  <Space height='35px' />
                </Box>
              ))}
            </Box>

            <Box>
              <Box margin='0 auto' width='fit-content'>
                <Text fontSize={17} fontWeight={700}>
                  {isSignInPage ? 'Нет аккаунта? ' : 'Есть аккаунт? '}
                </Text>
                <StyledLink to={to}>
                  <Text fontSize={17} fontWeight={700} color={colors.PRIMARY}>
                    {isSignInPage ? 'Регистрация' : 'Войти'}
                  </Text>
                </StyledLink>
              </Box>
              <Space height={42} />
              <Button view='primary' type='submit'>
                {buttonText}
              </Button>
              <Space height={20} />
              {isSignInPage && (
                <Box margin='0 auto' width='fit-content'>
                  <Text fontSize={14} fontWeight={400}>
                    Забыли пароль?
                  </Text>
                  &nbsp;
                  <StyledLink to={RESET}>
                    <Text fontSize={14} fontWeight={400} color={colors.PRIMARY}>
                      Восстановить
                    </Text>
                  </StyledLink>
                </Box>
              )}
            </Box>
          </StyledForm>
        )}
      </Formik>
    </Box>
  );
};
