import { generatePath } from 'react-router-dom';

export const HOME = '/';
export const PROFILE = '/profile';
export const SINGIN = '/signin';
export const SIGNUP = '/signup';
export const SESSION = '/session/:testId';
export const COMPLETED = '/completed';

export const getSessionPath = (id: number | string = '') => {
  return generatePath(SESSION, {
    testId: id.toString(),
  });
};
