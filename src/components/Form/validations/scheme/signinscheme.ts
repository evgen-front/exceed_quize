import { FormikValues } from 'formik';
import validations, { ErrorsValues } from '../validations';

export const signInScheme = (values: FormikValues) => {
  const errors: ErrorsValues = {};

  const { withoutSpace, notNull, onlyCyrillicLatin, moreTwoSymbols, passValid } =
    validations;

  for (const validation of [withoutSpace, notNull, onlyCyrillicLatin, moreTwoSymbols]) {
    const error = validation(values.username);
    if (error) errors.username = error;
  }

  for (const validation of [withoutSpace, notNull, passValid]) {
    const error = validation(values.password);
    if (error) errors.password = error;
  }

  return errors;
};
