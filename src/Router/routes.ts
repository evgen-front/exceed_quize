import { generatePath } from "react-router-dom";

export const HOME = "/";
export const PROFILE = "/profile";
export const SINGIN = "/signin";
export const SIGNUP = "/signup";
export const TESTNEW = "/test/new";
export const TESTEDIT = "/test/edit/:id";
export const SESSION = "/session/:id";

export const getTestEditPath = (id: number | string = "") => {
  return generatePath(TESTEDIT, {
    id: id.toString(),
  });
};

export const getSessionPath = (id: number | string = "") => {
  return generatePath(SESSION, {
    id: id.toString(),
  });
};
