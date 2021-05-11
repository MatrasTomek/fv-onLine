export const COOKIE_SET = "COOKIE_SET";
export const COOKIE_DELETE = "COOKIE_DELETE";

export const cookieSet = () => ({
  type: COOKIE_SET,
  isCookie: true,
});

export const cookieDel = () => ({
  type: COOKIE_DELETE,
  isCookie: false,
});
