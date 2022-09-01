import { FormikValues } from 'formik';
import validations, { ErrorsValues } from '../validations';

export const resetScheme = (values: FormikValues) => {
  const errors: ErrorsValues = {};

  const { withoutSpace, notNull, passValid, fojinEmail, sameValues } = validations;

  for (const validation of [withoutSpace, notNull, fojinEmail]) {
    const error = validation(values.email);
    if (error) errors.email = error;
  }

  for (const validation of [withoutSpace, notNull, passValid]) {
    const error = validation(values.password);
    if (error) errors.password = error;
  }

  const error = sameValues(values.password, values.confirmPassword);
  if (error) errors.confirmPassword = error;

  return errors;
};
