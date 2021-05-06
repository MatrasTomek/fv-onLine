export const LOGIN_POST = "LOGIN_POST";

const loginPost = ({ login, password }) => ({
  type: LOGIN_POST,
  payload: {
    password,
    login,
    id: Math.floor(Math.random * 1112),
  },
});
