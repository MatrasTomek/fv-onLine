export const LOGIN_POST = "LOGIN_POST";
export const LOGIN_DEL = "LOGIN_DEL";

export const loginPost = () => ({
  type: LOGIN_POST,
  isLogin: true,
});

export const loginDel = () => ({
  type: LOGIN_DEL,
  isLogin: false,
});
