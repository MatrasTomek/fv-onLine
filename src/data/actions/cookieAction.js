export const COOKIE_SET = "COOKIE_SET";
export const COOKIE_DELETE = "COOKIE_DELETE";

export const cookieSet = ({ name }) => ({
  type: COOKIE_SET,
  payload: {
    name,
  },
});

export const cookieDel = ({ name }) => ({
  type: COOKIE_DELETE,
  payload: {
    name,
  },
});
