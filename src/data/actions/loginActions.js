export const LOGIN_POST = "LOGIN_POST";

export const loginPost = ({ name }) => ({
  type: LOGIN_POST,
  payload: name,
});
